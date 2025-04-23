import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const AutoPayOnScroll = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const handleScroll = async () => {
      setStatus(null);
      try {
        if (!window.webln) {
          setStatus({ type: 'error', message: 'WebLN not available. Please use Alby or another WebLN-enabled wallet.' });
          return;
        }
        await window.webln.enable();
        // For demo: pay to a static LN address (replace with a valid one in production)
        const lnAddress = 'lnurl1dp68gurn8ghj7mrww4exctnrdakj7mrww4exctnrdakj7mrww4exctnrdakj7';
        await window.webln.sendPayment(lnAddress); // This should be a valid invoice or LNURL
        setStatus({ type: 'success', message: 'Auto-payment of 1 sat sent!' });
      } catch (err) {
        setStatus({ type: 'error', message: err.message || 'Auto-payment failed.' });
      }
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
      <Typography variant="body2" color="text.secondary">Scroll anywhere on the page to trigger a 1 sat payment (demo).</Typography>
    </Box>
  );
};

export default AutoPayOnScroll;
