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
    name: "opBNB Mainnet",
    chain: "opBNB",
    rpc: [
      "https://opbnb-mainnet-rpc.bnbchain.org"
    ],
    faucets: ["https://free-online-app.com/faucet-for-eth-evm-chains/"],
    nativeCurrency: {
      "name": "BNB Chain Native Token",
      "symbol": "BNB",
      "decimals": 18
    },
    infoURL: "https://opbnb.bnbchain.org/en",
    shortName: "obnb",
    chainId: 204,
    networkId: 204,
    explorers: [
      {
        name: "opbnbscan",
        url: "http://mainnet.opbnbscan.com/",
        standard: "EIP3091"
      }
    ]
  },
  {
    name: "opBNB Testnet",
    chain: "opBNB",
    rpc: [
      "https://opbnb-testnet-rpc.bnbchain.org"
    ],
    faucets: ["https://testnet.bnbchain.org/faucet-smart"],
    nativeCurrency: {
      name: "BNB Chain Native Token",
      symbol: "tBNB",
      decimals: 18
    },
    infoURL: "https://opbnb.bnbchain.org/en",
    shortName: "obnbt",
    chainId: 5611,
    networkId: 5611,
    explorers: [
      {
        name: "bscscan-opbnb-testnet",
        url: "https://opbnb-testnet.bscscan.com/",
        standard: "EIP3091"
      },
      {
        name: "opbnbscan",
        url: "http://opbnbscan.com/",
        standard: "EIP3091"
      }
    ]
  }
]
