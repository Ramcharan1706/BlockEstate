import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import {
  SupportedWallet,
  WalletId,
  WalletManager,
  WalletProvider,
} from '@txnlab/use-wallet-react';

// Pages and Components
import Home from './Home';
import LoginPage from './pages/LoginPage';
import DigiLockerCallback from './pages/DigiLockerCallBack'; // ✅ Fixed file name case
import PropertyList from './components/propertylist'; // Add your property list page/component here
import PropertyDetail from './components/propertydetail'; // Add your property detail page/component here

// Utils for Algorand configuration
import {
  getAlgodConfigFromViteEnvironment,
  getKmdConfigFromViteEnvironment,
} from './utils/network/getAlgoClientConfigs';

// Get supported wallets based on environment
const getSupportedWallets = (): SupportedWallet[] => {
  const isLocal = import.meta.env.VITE_ALGOD_NETWORK === 'localnet';

  if (isLocal) {
    const kmdConfig = getKmdConfigFromViteEnvironment();
    return [
      {
        id: WalletId.KMD,
        options: {
          baseServer: kmdConfig.server,
          token: String(kmdConfig.token),
          port: String(kmdConfig.port),
        },
      },
    ];
  }

  return [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
  ];
};

const App: React.FC = () => {
  const algodConfig = getAlgodConfigFromViteEnvironment();

  const walletManager = new WalletManager({
    wallets: getSupportedWallets(),
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: String(algodConfig.port),
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        <Router>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/digilocker/callback" element={<DigiLockerCallback />} />

            {/* Property Routes */}
            <Route path="/properties" element={<PropertyList />} /> {/* List of properties */}
            <Route path="/properties/:id" element={<PropertyDetail />} /> {/* Single property details */}

            {/* Add any additional routes here */}
          </Routes>
        </Router>
      </WalletProvider>
    </SnackbarProvider>
  );
};

export default App;
