import { CiGrid41 } from 'react-icons/ci'
import { FaEthereum } from 'react-icons/fa'
import AptosLogo from 'assets/images/aptlogo.svg'

export const menuItem = [
  {
    type: 'noncollapsible',
    path: '/',
    key: 'dashboard',
    name: 'Home',
    icon: <CiGrid41 className='font-light' />,
  },
  {
    type: 'collapsible',
    path: '/evm',
    key: 'evm',
    name: 'EVM Chains',
    icon: <FaEthereum />,
    collapse: [
      {
        name: 'Account Checker',
        key: 'account',
        path: '/evm/account',
      },
      {
        name: 'Native Balance Checker',
        key: 'balance-check',
        path: '/evm/balance-check',
      },
      {
        name: 'Tokens Balance Checker',
        key: 'tokens-check',
        path: '/evm/tokens-check',
      },
      {
        name: 'NFTs Balance Checker',
        key: 'nfts-check',
        path: '/evm/nfts-check',
      },
      {
        name: 'Transactions Checker',
        key: 'txs-check',
        path: '/evm/txs-check',
      },
    ],
  },
  {
    type: 'collapsible',
    path: '/aptos',
    key: 'aptos',
    name: 'Aptos',
    icon: AptosLogo,
    collapse: [
      {
        name: 'Account Checker',
        key: 'account',
        path: '/aptos/account',
      },
      {
        name: 'Native Balance Checker',
        key: 'balance-check',
        path: '/aptos/balance',
      },
      {
        name: 'Tokens Balance Checker',
        key: 'tokens-check',
        path: '/aptos/tokens',
      },
      {
        name: 'NFTs Balance Checker',
        key: 'nfts-check',
        path: '/aptos/nfts',
      },
      {
        name: 'Transactions Checker',
        key: 'txs-check',
        path: '/aptos/txs',
      },
    ],
  },
]
