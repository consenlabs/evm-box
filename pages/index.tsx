import { Divider, Grid, Page, Input } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { GetStaticProps } from 'next'
import { FormEventHandler, useState } from 'react'
import debounce from 'lodash/debounce'
import { orderBy } from 'lodash'
import { ChainItem } from '../common/components'
import { getOriginChains } from '../common/services'
import { CUSTOM_NETWORKS } from '../common/custom-networks'
import { mergeNetworkConfig } from '../common/utils'
interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  const [filter, setFilter] = useState<Chain[]>(chains)

  const searchNetwork: FormEventHandler<HTMLInputElement> = e => {
    const searchContent = (e.target as HTMLInputElement).value.trim()
    console.log(searchContent, 's')
    if (!searchContent) {
      setFilter(chains)
    } else {
      const searchResult = filter.filter(chain => {
        const { name, shortName, chain: chainText, network, networkId } = chain
        return [name, shortName, chainText, network, networkId.toString()]
          .map(item => item.toLowerCase())
          .some(item => item.indexOf(searchContent.toLowerCase()) > -1)
      })
      setFilter(searchResult)
    }
  }

  const debouncedSearch = debounce(searchNetwork, 500)

  const onSearch: FormEventHandler<HTMLInputElement> = e => {
    if (e.persist) {
      e.persist()
      debouncedSearch(e)
    } else {
      setFilter(chains)
    }
  }

  return (
    <>
      <div className="chainlist">
        <Page>
          <Page.Header>
            <h2>EVM Box</h2>
            <p>EVM Box is a list of EVM networks. Helping users connect to EVM powered networks.</p>
          </Page.Header>
          <Input
            width="100%"
            placeholder="Search Network by name, symbol or chainId"
            icon={<Search />}
            onChange={onSearch}
            clearable
          />
          <Divider />

          <Grid.Container gap={2} className="network__container">
            {filter.map((chain: Chain) => (
              <Grid sm={12} xs={24} key={chain.chainId}>
                <ChainItem chain={chain} />
              </Grid>
            ))}
          </Grid.Container>
        </Page>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const originChains = await getOriginChains()

    const chains = mergeNetworkConfig(originChains, CUSTOM_NETWORKS)

    return {
      props: {
        chains: orderBy(chains, ['chainId']),
      },
    }
  } catch (error) {
    console.error('getStaticProps failed', error)
    return {
      props: {
        chains: [],
      },
    }
  }
}
