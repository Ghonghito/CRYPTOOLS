import axios from 'axios'
import { supportedChains } from 'config'

const web3ApiKey = 'l7H7MfYwlfi1e7MjCpxbWsEWzLTudxOmgxJl4HvNixTrUduN1dZRHyW9ehyN4PXK'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': web3ApiKey,
  },
}

export const getWalletNativeBalance = async (walletAddress, chain) => {
  const json = await axios(`https://deep-index.moralis.io/api/v2/${walletAddress}/balance?chain=${chain}`, options)
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getEVMNativeBalance = async (walletAddress, isList) => {
  if (isList === true) {
    let balanceList = []
    supportedChains.forEach(async (chain) => {
      await Promise.all(
        walletAddress.map(async (x) => {
          const getBalance = await getWalletNativeBalance(x, chain.chainIdHex)
          if (getBalance.status === 200) {
            balanceList.push({ chainName: chain.networkSymbol, address: x, balance: Number(getBalance.data.balance) / 10 ** 18 })
          } else {
            return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
          }
        })
      )
    })
    return { status: 200, statusCode: 'success', data: balanceList }
  } else {
    supportedChains.forEach(async (chain) => {
      const getBalance = await getWalletNativeBalance(walletAddress, chain.chainIdHex)
      if (getBalance.status === 200) {
        return { status: 200, statusCode: 'success', data: [{ address: walletAddress, balance: Number(getBalance.data.balance) / 10 ** 18 }] }
      } else {
        return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
      }
    })

    /* const getBalance = await getWalletNativeBalance(walletAddress)
    if (getBalance.status === 200) {
      if (Object.keys(getBalance.data.data.current_coin_balances).length > 0) {
        return { status: 200, statusCode: 'success', data: [{ address: walletAddress, balance: Number(getBalance.data.balance) / 10 ** 18 }] }
      }
    } else {
      return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
    } */
  }
}
