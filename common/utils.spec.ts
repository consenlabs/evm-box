import assert from 'assert'
import { filterNetworksByNativeCurrency, hasSupportedNativeCurrency } from './utils'

const chainWithDecimals = (chainId: number, decimals: number): Chain =>
  ({
    chainId,
    nativeCurrency: {
      decimals,
      name: decimals === 18 ? 'Ether' : 'Tron',
      symbol: decimals === 18 ? 'ETH' : 'TRX',
    },
  } as Chain)

const ethereum = chainWithDecimals(1, 18)
const tronNile = chainWithDecimals(3448148188, 6)

assert.strictEqual(hasSupportedNativeCurrency(ethereum), true)
assert.strictEqual(hasSupportedNativeCurrency(tronNile), false)
assert.deepStrictEqual(filterNetworksByNativeCurrency([ethereum, tronNile]), [ethereum])

// Precision alone cannot establish whether a network is EVM-compatible.
const unknownNetwork = { ...chainWithDecimals(999999, 18), chain: 'UNKNOWN' }
assert.strictEqual(hasSupportedNativeCurrency(unknownNetwork), true)
assert.deepStrictEqual(filterNetworksByNativeCurrency([unknownNetwork]), [unknownNetwork])
