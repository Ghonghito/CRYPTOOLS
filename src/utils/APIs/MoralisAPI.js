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

export const getEVMNativeBalance = async (walletAddresses) => {
  const balanceList = await Promise.all(
    supportedChains.map(async (chain) => {
      return Promise.all(
        walletAddresses.map(async (address) => {
          const { status, data } = await getWalletNativeBalance(address, chain.chainIdHex);
          if (status === 200) {
            return { chainName: chain.networkSymbol, address, balance: Number(data.balance) / 10 ** 18 };
          } else {
            throw new Error('API connection failed! try again!');
          }
        })
      );
    })
  ).then((res) => [].concat(...res));
  return { status: 200, statusCode: 'success', data: balanceList };
};