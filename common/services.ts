import Gateway from '@consenlabs-fe/gateway'
import axios from 'axios'

const wrappedAxios = Gateway.withAxiosGateway(axios)

const get = async (url: string) =>
  wrappedAxios({
    method: 'get',
    url: url,
  }).then(res => res.data)

export const getOriginChains = async () => await get('https://chainid.network/chains.json')
