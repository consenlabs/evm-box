import { GetStaticProps } from 'next'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Divider, Grid, Input, useTheme } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import debounce from 'lodash/debounce'
import { ChainItem } from '../common/components'
import { getOriginChains } from '../common/services'
import { ADDITIONAL_NETWORKS, CUSTOM_NETWORKS } from '../common/custom-networks'
import { mergeNetworkConfig } from '../common/utils'
import { useLocale } from '../common/hooks/useLocale'
import BackToTop from '../common/components/BackToTop'
import Header from '../common/components/Header'
interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  const theme = useTheme()
  const [filter, setFilter] = useState<Chain[]>(chains)
  const [mounted, setMounted] = useState(false)
  const t = useLocale()

  const searchNetwork: FormEventHandler<HTMLInputElement> = e => {
    const searchContent = (e.target as HTMLInputElement).value.trim()
    if (!searchContent) {
      setFilter(chains)
    } else {
      const searchResult = chains.filter(chain => {
        const { name, shortName, chain: chainText, network, networkId } = chain
        return [name, shortName, chainText, network, networkId.toString()]
          .filter(Boolean)
          .map(item => item?.toLowerCase())
          .some(item => item?.includes(searchContent.toLowerCase()))
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Header />
      <div className="layout">
        <main>
          <p className="desc">{t('AppDesc')}</p>
          <Input
            width="100%"
            placeholder="Search Network by name, symbol or chainId"
            icon={<Search />}
            onChange={onSearch}
            clearable
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            enterKeyHint="search"
          />
          <Divider />

          <Grid.Container gap={2} className="network__container">
            {filter.map((chain: Chain) => (
              <Grid sm={12} xs={24} key={`${chain.name}:${chain.chainId}`}>
                <ChainItem chain={chain} />
              </Grid>
            ))}
          </Grid.Container>
        </main>
      </div>
      <BackToTop />
      <style jsx>{`
        .desc {
          margin-top: 100px;
        }

        .layout {
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
        }
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .layout {
            width: 90vw;
            max-width: 90vw;
            padding: 20px 0;
          }
          .desc {
            margin-top: 70px;
          }
        }
      `}</style>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const originChains = await getOriginChains()

    const chains = mergeNetworkConfig(originChains, CUSTOM_NETWORKS, ADDITIONAL_NETWORKS)

    return {
      props: {
        chains,
      },
      revalidate: 1 * 60 * 60 * 24,
    }
  } catch (error) {
    process.exitCode = 1
    console.log('getOriginChains failed:', error)
    return {
      props: {
        chains: [],
      },
    }
  }
}
