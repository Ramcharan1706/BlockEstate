import React, { useState, useEffect } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import ConnectWallet from './components/ConnectWallet';
import Transact from './components/Transact';
import AppCalls from './components/AppCalls';
import LandManager from './components/LandManager';
import PropertyList from './components/propertylist';
import PropertyDetail from './components/propertydetail';
import DigiLockerAuth from './components/DigiLockerAuth'; // Import DigiLockerAuth

const Home: React.FC = () => {
  const { activeAddress } = useWallet();
  const [modals, setModals] = useState({
    wallet: false,
    transact: false,
    appCalls: false,
    digilocker: false,  // New modal for DigiLocker Auth
  });

  const [fadeIn, setFadeIn] = useState(false);
  const [authHash, setAuthHash] = useState<string | null>(null);  // State for storing DigiLocker auth hash

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const toggleModal = (key: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAuthSuccess = (hash: string) => {
    setAuthHash(hash);
    console.log("DigiLocker Auth Success:", hash);
    // Handle any further actions with the hash (e.g., fetch data, update UI, etc.)
  };

  const baseButton: React.CSSProperties = {
    padding: '0.8rem 1.6rem',
    margin: '0.5rem 0',
    width: '100%',
    fontSize: '1.2rem',
    fontWeight: 600,
    borderRadius: '0.7rem',
    cursor: 'pointer',
    transition: 'all 0.4s ease-in-out',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  };

  const buttonGradient: React.CSSProperties = {
    ...baseButton,
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    color: '#fff',
    border: 'none',
    transform: 'scale(1)',
  };

  const buttonOutline: React.CSSProperties = {
    ...baseButton,
    backgroundColor: '#fff',
    border: '2px solid #ff7e5f',
    color: '#ff7e5f',
  };

  const sectionStyle: React.CSSProperties = {
    marginTop: '2.5rem',
    padding: '1.8rem',
    background: 'linear-gradient(to bottom right, #ffffff, #f0fdfa)',
    borderRadius: '1rem',
    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1.2rem',
          padding: '3rem',
          maxWidth: '850px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 65px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <h1
          style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            animation: 'slideIn 1s ease-out',
          }}
        >
          🌍 Welcome To BlockEstate 
        </h1>

        <p
          style={{
            color: '#4a5568',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            animation: 'fadeInText 1.5s ease-in-out',
          }}
        >
          Secure, Smart, and Scalable Digital Land Ownership on Algorand.
        </p>

        {/* Wallet Button */}
        <button
          style={buttonGradient}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => toggleModal('wallet')}
        >
          {activeAddress ? '🔄 Change Wallet' : '🔌 Connect Wallet'}
        </button>

        {activeAddress && (
          <div style={{ marginTop: '1.5rem' }}>
            <button
              style={buttonOutline}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fffae6')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              onClick={() => toggleModal('transact')}
            >
              💸 Transactions Demo
            </button>

            <button
              style={buttonOutline}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0e6ff')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              onClick={() => toggleModal('appCalls')}
            >
              ⚙️ Contract Interactions
            </button>

            {/* DigiLocker Auth Button */}
            <button
              style={buttonOutline}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0f7fa')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              onClick={() => toggleModal('digilocker')}
            >
              🔑 Login with DigiLocker
            </button>
          </div>
        )}

        {/* Property Section */}
        <div style={sectionStyle}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#ff7e5f',
              marginBottom: '1rem',
              animation: 'fadeInText 1.5s ease-in-out',
            }}
          >
            🏡 Available Properties
          </h2>
          <PropertyList />
        </div>

        {/* Land Manager Section */}
        <div style={{ ...sectionStyle, marginTop: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#20c997',
              marginBottom: '1rem',
            }}
          >
            🧭 Land Management Tools
          </h2>
          <LandManager />
        </div>

        {/* Modals */}
        <ConnectWallet openModal={modals.wallet} closeModal={() => toggleModal('wallet')} />
        <Transact openModal={modals.transact} setModalState={(v) => setModals({ ...modals, transact: v })} />
        <AppCalls openModal={modals.appCalls} setModalState={(v) => setModals({ ...modals, appCalls: v })} />

        {/* DigiLocker Auth Modal */}
        <DigiLockerAuth openModal={modals.digilocker} onAuthSuccess={handleAuthSuccess} closeModal={() => toggleModal('digilocker')} />
      </div>
    </div>
  );
};

export default Home;
