import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import SendPayment from './components/SendPayment';
import Keysend from './components/Keysend';
import AutoPayOnScroll from './components/AutoPayOnScroll';
import WalletInfo from './components/WalletInfo';
import InvoiceGenerator from './components/InvoiceGenerator';
import PayViaWebLN from './components/PayViaWebLN';
import QRCodeScanner from './components/QRCodeScanner';
import FiatSatsConverter from './components/FiatSatsConverter';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#ffbe30' },
      secondary: { main: '#1a237e' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4} mb={2}>
          <Typography variant="h4" fontWeight={700}>
            Lightning WebLN Demo
          </Typography>
          <IconButton onClick={() => setDarkMode((d) => !d)} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
        <FiatSatsConverter />
        <SendPayment />
        <Keysend />
        <AutoPayOnScroll />
        <WalletInfo />
        <InvoiceGenerator />
        <PayViaWebLN />
        <QRCodeScanner />
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Powered by Alby WebLN · Responsive · Dark Mode · QR · Fiat/Sats
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
