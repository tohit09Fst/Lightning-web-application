import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BoltIcon from '@mui/icons-material/Bolt';
import PaidIcon from '@mui/icons-material/Paid';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MouseIcon from '@mui/icons-material/Mouse';

// Components
import SendPayment from './components/SendPayment';
import Keysend from './components/Keysend';
import AutoPayOnScroll from './components/AutoPayOnScroll';
import WalletInfo from './components/WalletInfo';
import InvoiceGenerator from './components/InvoiceGenerator';
import PayViaWebLN from './components/PayViaWebLN';
import QRCodeScanner from './components/QRCodeScanner';
import FiatSatsConverter from './components/FiatSatsConverter';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={500}>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#f9a825' },  // Warmer gold color
      secondary: { main: '#1e88e5' }, // Brighter blue
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: '100vw',
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}>
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', width: '100vw' }}>
          <Toolbar sx={{ px: { xs: 1, sm: 2, md: 4, lg: 8 } }}>
            <Box display="flex" alignItems="center">
              <BoltIcon sx={{ color: 'primary.main', mr: 1.5, fontSize: 28 }} />
              <Typography variant="h5" component="h1" fontWeight={700} color="primary.main" sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }}>
                Lightning WebLN
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={() => setDarkMode((d) => !d)} color="inherit" sx={{ ml: 1 }}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="lightning app navigation tabs"
            sx={{
              width: '100vw',
              maxWidth: '100vw',
              '& .MuiTabs-indicator': { height: 3 },
              '& .MuiTab-root': { minWidth: 'auto', px: { xs: 1, sm: 2, md: 3 } }
            }}
          >
            <Tab icon={<PaidIcon />} label="Payments" {...a11yProps(0)} />
            <Tab icon={<ReceiptIcon />} label="Invoices" {...a11yProps(1)} />
            <Tab icon={<QrCodeIcon />} label="QR Code" {...a11yProps(2)} />
            <Tab icon={<AccountBalanceWalletIcon />} label="Wallet" {...a11yProps(3)} />
            <Tab icon={<SwapHorizIcon />} label="Converter" {...a11yProps(4)} />
            <Tab icon={<MouseIcon />} label="AutoPay" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            mt: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 6 },
            px: { xs: 0, sm: 1, md: 3, lg: 8 },
            flex: 1,
            width: '100vw',
            minHeight: 'calc(100vh - 140px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <TabPanel value={tabValue} index={0}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <SendPayment />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <Keysend />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <PayViaWebLN />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <InvoiceGenerator />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <QRCodeScanner />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <WalletInfo />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={4}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}>
                  <FiatSatsConverter />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={5}>
            <Grid container direction="column" spacing={3} sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }} className="paper-hover">
                  <AutoPayOnScroll />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
        
        <Box component="footer" sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 },
          mt: 'auto',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          width: '100vw',
        }}>
          <Container maxWidth={false} disableGutters sx={{ px: { xs: 1, sm: 4 }, width: '100vw' }}>
            <Grid container spacing={2} alignItems="center" sx={{ width: '100%', m: 0 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  Powered by Alby WebLN
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                  <BoltIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                  Lightning Network Demo
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
