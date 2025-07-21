/**
 * Custom Networks have the top priority
 *
 * means CUSTOM_NETWORKS and default config the same `chainId` will use the CUSTOM one merge into the default one.
 */
export const CUSTOM_NETWORKS: Array<AtLeastOne<Chain, 'chainId' | 'name'>> = [
  {
    chainId: 97,
    name: 'Binance Smart Chain Testnet',
    network: 'testnet',
  },
  {
    chainId: 137,
    name: 'Matic Mainnet',
    rpc: ['https://matic-mainnet.chainstacklabs.com'],
  },
  {
    chainId: 5,
    name: 'Goerli',
    faucets: ['https://faucetlink.to/goerli'],
  },
  {
    name: 'Linea Testnet',
    chainId: 59140,
    faucets: ['https://faucetlink.to/goerli', 'https://faucet.goerli.linea.build/'],
  },
  {
    name: "JuChain Mainnet",
    chainId: 210000,
    networkId: 210000,
  },
  {
    name: "IBVM Mainnet",
    chainId: 2105,
    faucets: ['https://faucet.ibvm.io']
  },
]

export const ADDITIONAL_NETWORKS: Array<Chain> = [
  
]
