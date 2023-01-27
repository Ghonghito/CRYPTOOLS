import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import BSC from 'assets/images/Blockchains/Binance.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import Fantom from 'assets/images/Blockchains/Fantom.svg'
import Polygon from 'assets/images/Blockchains/Matic.svg'

export const MAINNET_NODE_URL = 'https://fullnode.mainnet.aptoslabs.com/v1'
export const INDEXER = 'https://indexer.mainnet.aptoslabs.com/v1/graphql'


export const supportedChains = [
  {
    networkName: 'Ethereum',
    networkSymbol: 'ETH',
    moralisId: 'eth',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: 1,
    chainIdHex: '0x1',
    wrappedTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    coingeckoId: 'ethereum',
    coingeckoPlatformId: 'ethereum',
    logo: ETH,
    logoSize: 'w-3'
  },
  {
    networkName: 'Polygon',
    networkSymbol: 'MATIC',
    moralisId: 'polygon',
    coinName: 'MATIC',
    tokenProtocol: 'ERC20',
    chainId: 137,
    chainIdHex: '0x89',
    wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    coingeckoId: 'matic-network',
    coingeckoPlatformId: 'polygon-pos',
    logo: Polygon,
    logoSize: 'w-4'
  },
  {
    networkName: 'Smart Chain',
    networkSymbol: 'BSC',
    moralisId: 'bsc',
    coinName: 'BNB',
    tokenProtocol: 'BEP20',
    chainId: 56,
    chainIdHex: '0x38',
    wrappedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    coingeckoId: 'binancecoin',
    coingeckoPlatformId: 'binance-smart-chain',
    logo: BSC,
    logoSize: 'w-4'
  },
  {
    networkName: 'Avalanche',
    networkSymbol: 'AVAX',
    moralisId: 'avalanche',
    coinName: 'AVAX',
    tokenProtocol: 'ERC20',
    chainId: 43114,
    chainIdHex: '0xa86a',
    wrappedTokenAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    coingeckoId: 'avalanche-2',
    coingeckoPlatformId: 'avalanche',
    logo: AVAX,
    logoSize: 'w-4'
  },
  {
    networkName: 'Fantom',
    networkSymbol: 'FTM',
    moralisId: 'fantom',
    coinName: 'FTM',
    tokenProtocol: 'ERC20',
    chainId: 250,
    chainIdHex: '0xfa',
    wrappedTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingeckoId: 'fantom',
    coingeckoPlatformId: 'fantom',
    logo: Fantom,
    logoSize: 'w-3'
  },
  {
    networkName: 'Cronos',
    networkSymbol: 'CRO',
    moralisId: 'cronos',
    coinName: 'CRO',
    tokenProtocol: 'CRC20',
    chainId: 25,
    chainIdHex: '0x19',
    wrappedTokenAddress: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    coingeckoId: 'crypto-com-chain',
    coingeckoPlatformId: 'cronos',
    logo: Cronos,
    logoSize: 'w-4'
  },
  {
    networkName: 'Arbitrum',
    networkSymbol: 'ARB',
    moralisId: 'arbitrum',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: 42161,
    chainIdHex: '0xa4b1',
    wrappedTokenAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    coingeckoId: 'ethereum',
    coingeckoPlatformId: 'arbitrum-one',
    logo: Arbitrum,
    logoSize: 'w-4'

  }
]

export const supportedChainsList = {
  ETH: {
    networkName: 'Ethereum',
    networkSymbol: 'ETH',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: 1,
    chainIdHex: '0x1',
    wrappedTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    coingeckoId: 'ethereum',
    coingeckoPlatformId: 'ethereum',
    logo: ETH,
    logoSize: 'w-3'
  },
  BSC: {
    networkName: 'Smart Chain',
    networkSymbol: 'BSC',
    coinName: 'BNB',
    tokenProtocol: 'BEP20',
    chainId: 56,
    chainIdHex: '0x38',
    wrappedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    coingeckoId: 'binancecoin',
    coingeckoPlatformId: 'binance-smart-chain',
    logo: BSC,
    logoSize: 'w-4'
  },
  MATIC: {
    networkName: 'Polygon',
    networkSymbol: 'MATIC',
    coinName: 'MATIC',
    tokenProtocol: 'ERC20',
    chainId: 137,
    chainIdHex: '0x89',
    wrappedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    coingeckoId: 'matic-network',
    coingeckoPlatformId: 'polygon-pos',
    logo: Polygon,
    logoSize: 'w-4'
  },
  AVAX: {
    networkName: 'Avalanche',
    networkSymbol: 'AVAX',
    coinName: 'AVAX',
    tokenProtocol: 'ERC20',
    chainId: 43114,
    chainIdHex: '0xa86a',
    wrappedTokenAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    coingeckoId: 'avalanche-2',
    coingeckoPlatformId: 'avalanche',
    logo: AVAX,
    logoSize: 'w-4'
  },
  FTM: {
    networkName: 'Fantom',
    networkSymbol: 'FTM',
    coinName: 'FTM',
    tokenProtocol: 'ERC20',
    chainId: 250,
    chainIdHex: '0xfa',
    wrappedTokenAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingeckoId: 'fantom',
    coingeckoPlatformId: 'fantom',
    logo: Fantom,
    logoSize: 'w-3'
  },
  CRO: {
    networkName: 'Cronos',
    networkSymbol: 'CRO',
    coinName: 'CRO',
    tokenProtocol: 'CRC20',
    chainId: 25,
    chainIdHex: '0x19',
    wrappedTokenAddress: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    coingeckoId: 'crypto-com-chain',
    coingeckoPlatformId: 'cronos',
    logo: Cronos,
    logoSize: 'w-4'
  },
  ARB: {
    networkName: 'Arbitrum',
    networkSymbol: 'ARB',
    coinName: 'ETH',
    tokenProtocol: 'ERC20',
    chainId: 42161,
    chainIdHex: '0xa4b1',
    wrappedTokenAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    coingeckoId: 'ethereum',
    coingeckoPlatformId: 'arbitrum-one',
    logo: Arbitrum,
    logoSize: 'w-4'
  }
}