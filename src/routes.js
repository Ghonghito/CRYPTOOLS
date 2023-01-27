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
        key: 'balance',
        path: '/evm/balance',
      },
      {
        name: 'Tokens Balance Checker',
        key: 'tokens',
        path: '/evm/tokens',
      },
      {
        name: 'NFTs Balance Checker',
        key: 'nfts',
        path: '/evm/nfts',
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
        name: 'APT Balance Checker',
        key: 'balance',
        path: '/aptos/balance',
      },
      {
        name: 'Tokens Balance Checker',
        key: 'tokens',
        path: '/aptos/tokens',
      },
      {
        name: 'NFTs Balance Checker',
        key: 'nfts',
        path: '/aptos/nfts',
      },
    ],
  },
]
