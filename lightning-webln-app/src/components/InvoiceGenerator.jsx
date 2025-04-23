import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import QRCode from 'react-qr-code';

const InvoiceGenerator = () => {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [invoice, setInvoice] = useState('');
  const [error, setError] = useState(null);

  const handleMakeInvoice = async () => {
    setError(null);
    setInvoice('');
    try {
      if (!window.webln) {
        setError('WebLN not available. Please use Alby or another WebLN-enabled wallet.');
        return;
      }
      await window.webln.enable();
      const result = await window.webln.makeInvoice({ amount: Number(amount), memo });
      setInvoice(result.paymentRequest);
    } catch (err) {
      setError(err.message || 'Could not create invoice.');
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="h6">Invoice Generator (makeInvoice)</Typography>
      <TextField
        label="Amount (sats)"
        type="number"
        fullWidth
        margin="normal"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <TextField
        label="Memo"
        fullWidth
        margin="normal"
        value={memo}
        onChange={e => setMemo(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!amount}
        onClick={handleMakeInvoice}
        sx={{ mt: 1 }}
      >
        Generate Invoice
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {invoice && (
        <Box mt={2}>
          <Typography variant="body2">Invoice:</Typography>
          <TextField value={invoice} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          <Box mt={2} display="flex" justifyContent="center">
            <QRCode value={invoice} size={180} style={{ background: 'white', padding: 8 }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default InvoiceGenerator;
