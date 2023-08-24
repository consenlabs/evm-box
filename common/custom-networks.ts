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
    faucets: ['https://faucetlink.to/goerli']
  },
  {
    name: "Linea Testnet",
    chainId: 59140,
    faucets: [
      "https://faucetlink.to/goerli",
      "https://faucet.goerli.linea.build/"
    ]
  },
  {
    nativeCurrency:  {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpc: "https://opbnb-mainnet-rpc.bnbchain.org",
    name: "opBNB Mainnet",
    chainId: 204,
    explorers:[
      {
        "name":"opBNBScan",
        "url":"http://mainnet.opbnbscan.com/",
        "standard":"EIP3091"
      }]
  },
  {
    name: "opBNB Testnet",
    nativeCurrency:  {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18,
    },
    rpc: "https://opbnb-testnet-rpc.bnbchain.org",
    chainId: 5611,
    faucets: [
      "https://faucetlink.to/goerli",
      "https://faucet.goerli.linea.build/"
    ],
    explorers:[
      {
        "name":"opBNBScan",
        "url":"http://mainnet.opbnbscan.com/",
        "standard":"EIP3091"
      }]
  }
]
