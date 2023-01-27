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
        if (getBalance.data.data && getBalance.data.data.current_coin_balances && Object.keys(getBalance.data.data.current_coin_balances).length > 0) {
          balanceList.push({ address: x, balance: Number(getBalance.data.data.current_coin_balances[0].amount) / 10 ** 8 })
        } else {
          balanceList.push({ address: x, balance: 0 })
        }
      } else {
        return { status: 404, statusCode: 'error', errorText: 'API connection failed! try again!' }
      }
    })
  )
  return { status: 200, statusCode: 'success', data: balanceList.sort((a, b) => b.balance - a.balance) }
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
  try {
    let tokenList = []
    for (const wallet of walletAddress) {
      const getTokenBalances = await getWalletTokensBalance(wallet, greaterThen)
      if (getTokenBalances.status === 200 && getTokenBalances.data.data.current_coin_balances.length > 0) {
        const tokenData = getTokenBalances.data.data.current_coin_balances.map(token => {
          return {
            name: token.coin_info.name,
            symbol: token.coin_info.symbol,
            decimals: token.coin_info.decimals,
            balance: Number(token.amount) / 10 ** token.coin_info.decimals
          }
        })

        tokenList.push({ address: wallet, data: tokenData })
      }
    }
    return { status: 200, statusCode: 'success', data: tokenList }
  } catch (error) {
    return { status: 400, statusCode: 'error', data: error }
  }
}

export const getWalletNFTsCount = async (walletAddress) => {
  const data = JSON.stringify({
    query: `query userNftBalanceCount($wallet_address: String) {
      current_token_ownerships_aggregate(
        where: {owner_address: {_eq: $wallet_address}, amount: {_gt: "0"}}
      ) {
        aggregate {
          count
        }
      }
    }
    `,
    variables: { wallet_address: walletAddress },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getNfts = async (walletAddress, limit, offset) => {
  const data = JSON.stringify({
    query: `query MyQuery($address: String, $limit: Int, $offset: Int) {
      current_token_ownerships(
        where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}}
        limit: $limit
        offset: $offset
        order_by: {collection_name: asc}
      ) {
        current_token_data {
          metadata_uri
          description
          creator_address
          collection_name
          name
          supply
          last_transaction_timestamp
          last_transaction_version
          royalty_points_numerator
          royalty_points_denominator
          royalty_mutable
          default_properties
        }
        property_version
        amount
        table_type
      }
    } `,
    variables: { address: walletAddress, limit: limit, offset: offset },
  })

  const json = await axios.post(INDEXER, data).catch((error) => error.response)
  return json
}

export const getNFTsBalanceForWallets = async (walletAddresses) => {
  let walletData = [];

  for (const address of walletAddresses) {
    const totalNftsForWallet = await getWalletNFTsCount(address);
    if (totalNftsForWallet.status === 200) {
      walletData.push({
        address,
        count: totalNftsForWallet.data.data.current_token_ownerships_aggregate.aggregate.count
      });
    }
  }

  let finalData = [];

  for (const wallet of walletData) {
    let offsetNum = 0;
    let totalNFTList = [];
    if (wallet.count === 0) {
      finalData.push({ address: wallet.address, count: wallet.count, data: [] });
    } else if (wallet.count <= 100) {
      const nfts = await getNfts(wallet.address, 100, 0);
      if (nfts.status === 200 && nfts.data.data.current_token_ownerships.length > 0) {
        finalData.push({ address: wallet.address, count: wallet.count, data: nfts.data.data.current_token_ownerships });
      }
    } else {
      do {
        const nfts = await getNfts(wallet.address, 100, offsetNum);
        if (nfts.status === 200) {
          totalNFTList = totalNFTList.concat(nfts.data.data.current_token_ownerships);
        }
        offsetNum += 100;
      } while (offsetNum <= wallet.count);
      finalData.push({ address: wallet.address, count: wallet.count, data: totalNFTList });
    }
  }

  finalData.sort((a, b) => b.data.length - a.data.length);
  return { status: 200, data: finalData };
};

export const checkAccountData = async (walletAddresses) => {

  let accountsData = []

  for (const account of walletAddresses) {
    const getAptBalance = await getAPTBalanceForWallets(Array(account))
    const getTokensBalance = await getTokenBalanceForWallets(Array(account))
    const getNftsBalance = await getNFTsBalanceForWallets(Array(account))
    accountsData.push({ address: account, data: { getAptBalance, getTokensBalance, getNftsBalance } })
  }
  accountsData.sort((a, b) => b.data.getAptBalance.data[0].balance - a.data.getAptBalance.data[0].balance)
  return accountsData

}