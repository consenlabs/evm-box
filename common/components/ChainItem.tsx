import { Fieldset, Grid, Button } from '@geist-ui/react'
import classnames from 'classnames'
import { useChain } from '../hooks/useChain'
import { useDApp } from '../hooks/useDApp'
import { useLocale } from '../hooks/useLocale'

interface IChainItemProps {
  chain: Chain
}

export const ChainItem: React.FC<IChainItemProps> = ({ chain }) => {
  const enable = useDApp()
  const [currentChainId, switchEthChain] = useChain()
  const t = useLocale()

  return (
    <>
      <Fieldset
        className={classnames('chain', {
          current: currentChainId === chain.chainId,
        })}
      >
        <Fieldset.Title className="chain-title">
          {/* {chain.nativeCurrency?.symbol ?? ''} */}
          {chain.name}
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <Grid.Container justify="space-between">
            <Grid>
              <p style={{ whiteSpace: 'nowrap' }}>{chain.chain}</p>
            </Grid>

            <Grid>
              <p style={{ textAlign: 'right' }}>chainId: {chain.chainId}</p>
            </Grid>
          </Grid.Container>
        </Fieldset.Subtitle>
        <Fieldset.Footer className="chain-footer">
          <div className="status">
            <Grid.Container gap={2}>
              <Grid>
                <a href={chain.infoURL} rel="noopener noreferrer">
                  {t('OfficialSite')}
                </a>
              </Grid>
              {
                chain.faucets.slice(0, 2).map((faucet) => {
                  try {
                    const url = new URL(faucet)
                    if (url.protocol === 'http:' && location.protocol === 'https:') {
                      url.protocol = 'https:'
                    }
                    return <Grid key={faucet}><a href={url.toString()} rel="noopener noreferrer"> {t('Faucet')} </a></Grid>
                  } catch {
                    // ignore invalid url
                  }
                })
              }
            </Grid.Container>
          </div>
          <div className="actions">
            {currentChainId === chain.chainId
              ? t('CurrentNetwork')
              : enable && (
                <Button
                  type="secondary"
                  ghost
                  scale={0.35}
                  onClick={() => switchEthChain(chain)}
                >
                  {t('Switch')}
                </Button>
              )}
          </div>
        </Fieldset.Footer>
      </Fieldset>
      <style jsx>
        {`
          :global(.chain) {
            display: block;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }

          :global(.chain:hover) {
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
          }

          :global(.current .content) {
            background: antiquewhite;
            color: #000;
          }
          :global(.chain-title) {
            display: flex !important;
          }
          :global(.chain-tag) {
            margin-left: auto;
          }
          :global(.chain-footer) {
            height: auto !important;
          }
          .status {
            font-size: 0.875rem;
            line-height: 1.2;
            margin: 0;
            display: inline-flex;
            word-break: break-word;
            max-width: 62%;
            flex-wrap: wrap;
          }
          .status > :global(p) {
            margin: 0;
          }
          .actions {
            display: flex;
            justify-content: flex-end;
          }
          @media (max-width: 768px) {
            .status a {
              font-size: 0.75rem;
            }
          }
        `}
      </style>
    </>
  )
}
