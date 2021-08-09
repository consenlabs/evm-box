import Gateway from '@consenlabs-fe/gateway'
import axios from 'axios'

const wrappedAxios = Gateway.withAxiosGateway(axios)

const get = async (url: string) => {
  return wrappedAxios({
    method: 'get',
    url: url,
  })
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.error(error)
    })
}

export const getOriginChains = async () => await get('https://chainid.network/chains.json')
