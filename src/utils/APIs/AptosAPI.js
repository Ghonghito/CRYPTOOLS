import axios from 'axios'
import { INDEXER } from 'config'

export const getWalletAPTBalance = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query MyQuery($owner_address: String) {
      current_coin_balances(
        where: {owner_address: {_eq: $owner_address}, coin_type: {_eq: "0x1::aptos_coin::AptosCoin"}}
      ) {
        amount
        coin_info {
          name
          decimals
          coin_type
          symbol
        }
      }
    }`,
    variables: { owner_address: walletAddress },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getAPTBalanceForWallets = async (walletAddress) => {
  let balanceList = []
  await Promise.all(
    walletAddress.map(async (x) => {
      const getBalance = await getWalletAPTBalance(x)
      if (getBalance.status === 200) {
        if (Object.keys(getBalance.data.data.current_coin_balances).length > 0) {
          balanceList.push({ address: x, balance: Number(getBalance.data.data.current_coin_balances[0].amount) / 10 ** 8 })
        }
      } else {
        return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
      }
    })
  )
  return { status: 200, statusCode: 'success', data: balanceList }
}

export const getWalletTokensBalance = async (walletAddress, greaterThen) => {
  var data = null
  if (greaterThen === 0) {
    data = JSON.stringify({
      query: `query MyQuery($owner_address: String, $amount: numeric) {
        current_coin_balances(
          where: {owner_address: {_eq: $owner_address}, amount: {_gt: $amount}}
        ) {
          coin_info {
            coin_type
            coin_type_hash
            decimals
            name
            symbol
          }
          amount
          coin_type
          coin_type_hash
        }
      }`,
      variables: { owner_address: walletAddress, amount: greaterThen },
    })
  } else {
    data = JSON.stringify({
      query: `query MyQuery($owner_address: String) {
        current_coin_balances(where: {owner_address: {_eq: $owner_address}}) {
          coin_info {
            coin_type
            coin_type_hash
            decimals
            name
            symbol
          }
          amount
          coin_type
          coin_type_hash
        }
      }`,
      variables: { owner_address: walletAddress },
    })
  }

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getTokenBalanceForWallets = async (walletAddress, greaterThen) => {
  let tokenList = []
  await Promise.all(
    walletAddress.map(async (y) => {
      const getTokenBalances = await getWalletTokensBalance(y, greaterThen)
      if (getTokenBalances.status === 200) {
        if (Object.keys(getTokenBalances.data.data.current_coin_balances).length > 0) {
          const test = getTokenBalances.data.data.current_coin_balances.map((x) => {
            return { name: x.coin_info.name, symbol: x.coin_info.symbol, decimals: x.coin_info.decimals, balance: Number(x.amount) / 10 ** x.coin_info.decimals }
          })

          tokenList.push({ address: y, data: test })

          /*  getTokenBalances.data.data.current_coin_balances.forEach((x) => {
            tokenList.push({ address: y, name: x.coin_info.name, symbol: x.coin_info.symbol, decimals: x.coin_info.decimals, balance: Number(x.amount) / 10 ** x.coin_info.decimals })
          }) */
        }
      }
      return { status: 200, statusCode: 'success', data: tokenList }
    })
  )
  return { status: 200, statusCode: 'success', data: tokenList }
}
