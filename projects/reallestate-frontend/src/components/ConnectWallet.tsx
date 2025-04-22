import React from 'react'
import { useWallet, Wallet, WalletId } from '@txnlab/use-wallet-react'
import Account from './Account'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet: React.FC<ConnectWalletInterface> = ({ openModal, closeModal }) => {
  const { wallets, activeAddress, setWalletNetwork } = useWallet()

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD

  const handleConnectWallet = (wallet: Wallet) => {
    wallet.connect()  // Connect to the selected wallet
    setWalletNetwork('Testnet') // Set the wallet network to Testnet
    closeModal() // Close the modal once the wallet is connected
  }

  const handleDisconnectWallet = async () => {
    const activeWallet = wallets?.find((w) => w.isActive)
    if (activeWallet) {
      await activeWallet.disconnect()
    } else {
      localStorage.removeItem('@txnlab/use-wallet:v3')
      window.location.reload() // Force refresh if no active wallet
    }
  }

  return (
    <dialog
      id="connect_wallet_modal"
      className={`modal ${openModal ? 'modal-open' : ''}`}
    >
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-2xl">Select Wallet Provider</h3>

        <div className="grid m-2 pt-5">
          {/* Display account information if an active address is connected */}
          {activeAddress ? (
            <>
              <Account />
              <div className="divider" />
            </>
          ) : (
            <p className="text-sm text-gray-600">Please connect your wallet to proceed.</p>
          )}

          {/* Display available wallets if no active address is connected */}
          {!activeAddress &&
            wallets?.map((wallet) => (
              <button
                key={`provider-${wallet.id}`}
                data-test-id={`${wallet.id}-connect`}
                className="btn border-teal-800 border-1 m-2 flex items-center gap-2"
                onClick={() => handleConnectWallet(wallet)} // Connect selected wallet
              >
                {!isKmd(wallet) && wallet.metadata.icon && (
                  <img
                    alt={`${wallet.id} icon`}
                    src={wallet.metadata.icon}
                    style={{ objectFit: 'contain', width: '30px', height: 'auto' }}
                  />
                )}
                <span>{isKmd(wallet) ? 'LocalNet Wallet' : wallet.metadata.name}</span>
              </button>
            ))}
        </div>

        <div className="modal-action grid">
          {/* Close modal button */}
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={closeModal}
          >
            Close
          </button>

          {/* Show Logout button only if activeAddress is connected */}
          {activeAddress && (
            <button
              className="btn btn-warning"
              data-test-id="logout"
              onClick={handleDisconnectWallet} // Disconnect wallet
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}

export default ConnectWallet
