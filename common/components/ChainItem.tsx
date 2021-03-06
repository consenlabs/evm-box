import { Fieldset, Row, Col, Button } from '@geist-ui/react'
import classnames from 'classnames'
import { useChain } from '../hooks/useChain'
import { useDApp } from '../hooks/useDApp'

interface IChainItemProps {
  chain: Chain
}

export const ChainItem: React.FC<IChainItemProps> = ({ chain }) => {
  const enable = useDApp()
  const [currentChainId, addEthChain] = useChain()

  return (
    <>
      <Fieldset className={classnames('chain', { current: currentChainId === chain.chainId })}>
        <Fieldset.Title className="chain-title">{chain.name}</Fieldset.Title>
        <Fieldset.Subtitle>
          <Row>
            <Col>
              <p>{chain.chain}</p>
            </Col>

            <Col>
              <p>chainId: {chain.chainId}</p>
            </Col>
          </Row>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            <a href={chain.infoURL} target="_self" rel="noopener noreferrer">
              Official Site
            </a>
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            {currentChainId === chain.chainId
              ? 'current network'
              : enable && (
                  <Button type="secondary" ghost size="mini" onClick={() => addEthChain(chain)}>
                    Add
                  </Button>
                )}
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
      <style jsx>
        {`
          :global(.chain) {
            width: 100%;
          }

          :global(.current .content) {
            background: antiquewhite;
          }
          :global(.chain-title) {
            display: flex !important;
          }
          :global(.chain-tag) {
            flex: none;
            margin-left: auto;
            width: 70px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        `}
      </style>
    </>
  )
}
