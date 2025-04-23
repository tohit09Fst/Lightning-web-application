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
      <Container maxWidth="xl" disableGutters sx={{ minHeight: '100vh', width: '100vw', p: 0 }}>
        <Box display="flex" flexDirection="column" minHeight="100vh" width="100vw" bgcolor="background.default">
          <Box display="flex" alignItems="center" justifyContent="space-between" px={{ xs: 2, md: 6 }} pt={4} pb={2}>
            <Typography variant="h4" fontWeight={700}>
              Lightning WebLN Demo
            </Typography>
            <IconButton onClick={() => setDarkMode((d) => !d)} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          <Box flex={1} width="100%" px={{ xs: 2, md: 6 }}>
            <FiatSatsConverter />
            <SendPayment />
            <Keysend />
            <AutoPayOnScroll />
            <WalletInfo />
            <InvoiceGenerator />
            <PayViaWebLN />
            <QRCodeScanner />
          </Box>
          <Box mt={4} textAlign="center" py={2} width="100%" bgcolor="background.paper">
            <Typography variant="body2" color="text.secondary">
              Powered by Alby WebLN · Responsive · Dark Mode · QR · Fiat/Sats
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
