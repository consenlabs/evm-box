import fetch from 'isomorphic-fetch'

const fetchAPI = async (input: RequestInfo) => {
  try {
    const resp = await fetch(input)
    return resp.json()
  } catch (error) {
    console.error(error)
  }
}

export const getOriginChains = async () => await fetchAPI('https://chainid.network/chains.json')
