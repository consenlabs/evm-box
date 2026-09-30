import assert from 'assert'
import { filterSupportedNetworks, isSupportedByImToken } from './utils'

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

assert.strictEqual(isSupportedByImToken(ethereum), true)
assert.strictEqual(isSupportedByImToken(tronNile), false)
assert.deepStrictEqual(filterSupportedNetworks([ethereum, tronNile]), [ethereum])
