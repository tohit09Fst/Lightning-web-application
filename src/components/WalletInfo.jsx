import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

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
    <Paper elevation={2} sx={{ p: 3, mb: 4, width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" mb={2} align="center">Wallet Info</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {info && (
        <Stack spacing={1}>
          <Grid container justifyContent="space-between"><Typography>Alias:</Typography><Typography fontWeight={600}>{info.node?.alias || 'N/A'}</Typography></Grid>
          <Grid container justifyContent="space-between"><Typography>Pubkey:</Typography><Typography fontWeight={600} sx={{ wordBreak: 'break-all' }}>{info.node?.pubkey || 'N/A'}</Typography></Grid>
          <Grid container justifyContent="space-between"><Typography>Balance:</Typography><Typography fontWeight={600}>{info.balance || '0'} sats</Typography></Grid>
        </Stack>
      )}
    </Paper>
  );
};

export default WalletInfo;
