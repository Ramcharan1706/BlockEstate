import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import { RealestateClient } from '../artifacts/RealestateClient'
import { OnSchemaBreak, OnUpdate } from '@algorandfoundation/algokit-utils/types/app'

export class RealestateFactory {
  private algorand: AlgorandClient
  private defaultSender: string | undefined

  constructor(options: { defaultSender?: string }) {
    const algodConfig = getAlgodConfigFromViteEnvironment()
    const indexerConfig = getIndexerConfigFromViteEnvironment()

    this.algorand = AlgorandClient.fromConfig({
      algodConfig,
      indexerConfig,
    })

    this.defaultSender = options.defaultSender
    if (this.defaultSender) {
      this.algorand.setDefaultSender({ sender: this.defaultSender })
    }
  }
  /**
   * Deploy the smart contract
   */
  public async deploy(options: { onSchemaBreak: OnSchemaBreak; onUpdate: OnUpdate }) {
    const appClient = new RealestateClient({ client: this.algorand, sender: this.defaultSender })
    await appClient.deploy({
      onSchemaBreak: options.onSchemaBreak,
      onUpdate: options.onUpdate,
    })

    return {
      appClient,
      appId: appClient.appId,
    }
  }
}
