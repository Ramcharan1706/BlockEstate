import { useWallet } from '@txnlab/use-wallet-react'
import { useMemo } from 'react'
import { ellipseAddress } from '../utils/ellipseAddress'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const Account = () => {
  const { activeAddress } = useWallet()
  const algoConfig = getAlgodConfigFromViteEnvironment()

  const networkName = useMemo(() => {
    return algoConfig.network ? algoConfig.network.toLowerCase() : 'localnet'
  }, [algoConfig.network])

  if (!activeAddress) {
    return (
      <div className="text-gray-600 text-sm">
        No wallet connected.
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm text-sm space-y-2">
      <div>
        <strong>Connected Wallet:</strong>{' '}
        <a
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://lora.algokit.io/${networkName}/account/${activeAddress}/`}
        >
          {ellipseAddress(activeAddress)}
        </a>
      </div>
      <div>
        <strong>Network:</strong> {networkName}
      </div>
    </div>
  )
}

export default Account
