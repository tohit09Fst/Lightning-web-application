import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const pubkey = '03ed1ac82ae516eababf31ae8e545cc8620848e9920238763e969cb2d2bb0431ca'; // Replace with your pubkey

const AutoPayOnScroll = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      // ensure only one invocation
      window.removeEventListener('scroll', handleScroll);
      if (loading || paid) return;
      setStatus(null);
      setLoading(true);
      try {
        if (!window.webln) {
          setStatus({ type: 'error', message: 'WebLN not available. Please use Alby or another WebLN-enabled wallet.' });
          return;
        }
        await window.webln.enable();
        // Auto keysend 1 sat to configured pubkey
        await window.webln.keysend({ destination: pubkey, amount: 1 });
        setStatus({ type: 'success', message: 'Auto keysend of 1 sat sent!' });
        setPaid(true);
      } catch (err) {
        setStatus({ type: 'error', message: err.message || 'Auto-payment failed.' });
      }
      setLoading(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box mb={2}>
      <Typography variant="h6">Auto-payment on Scroll</Typography>
      {status && (
        <Alert severity={status.type} sx={{ mt: 2 }}>{status.message}</Alert>
      )}
      {loading && (
        <Alert severity="info" sx={{ mt: 2 }}>Loading...</Alert>
      )}
      <Typography variant="body2" color="text.secondary">Scroll anywhere on the page to trigger a 1 sat payment (demo).</Typography>
    </Box>
  );
};

export default AutoPayOnScroll;
