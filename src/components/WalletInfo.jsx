import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const WalletInfo = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (!window.webln) {
          setError('WebLN not available. Please use Alby or another WebLN-enabled wallet.');
          return;
        }
        await window.webln.enable();
        const result = await window.webln.getInfo();
        setInfo(result);
      } catch (err) {
        setError(err.message || 'Could not fetch wallet info.');
      }
    };
    fetchInfo();
  }, []);

  return (
    <Box mb={2}>
      <Typography variant="h6">Wallet Info (getInfo)</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {info && (
        <Box mt={1}>
          <Typography variant="body2">Alias: {info.node?.alias || 'N/A'}</Typography>
          <Typography variant="body2">Pubkey: {info.node?.pubkey || 'N/A'}</Typography>
          <Typography variant="body2">Balance: {info.balance || 'N/A'} sats</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WalletInfo;
