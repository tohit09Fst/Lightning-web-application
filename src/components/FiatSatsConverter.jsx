import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const FiatSatsConverter = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [fiat, setFiat] = useState('');
  const [sats, setSats] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        setBtcPrice(Number(data.bitcoin.usd));
      } catch (e) {
        setError('Failed to fetch BTC price.');
      }
    };
    fetchPrice();
  }, []);

  const handleFiatChange = (e) => {
    const value = e.target.value;
    setFiat(value);
    if (btcPrice && value !== '') {
      setSats(Math.round((parseFloat(value) / btcPrice) * 1e8).toString());
    } else {
      setSats('');
    }
  };

  const handleSatsChange = (e) => {
    const value = e.target.value;
    setSats(value);
    if (btcPrice && value !== '') {
      setFiat(((parseInt(value) / 1e8) * btcPrice).toFixed(2));
    } else {
      setFiat('');
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="h6">Fiat ↔ Sats Converter</Typography>
      <Box display="flex" gap={2} mt={1}>
        <TextField
          label="USD"
          type="text"
          value={fiat}
          onChange={handleFiatChange}
          fullWidth
        />
        <TextField
          label="Sats"
          type="text"
          value={sats}
          onChange={handleSatsChange}
          fullWidth
        />
      </Box>
      {btcPrice && (
        <Typography variant="caption" color="text.secondary" mt={1} display="block">
          1 BTC = ${btcPrice.toLocaleString()} USD
        </Typography>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default FiatSatsConverter;
