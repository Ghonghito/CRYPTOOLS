import Alerts from 'components/Alerts'
import Arbitrum from 'assets/images/Blockchains/Arbitrum.svg'
import AVAX from 'assets/images/Blockchains/Avalanche.svg'
import BSC from 'assets/images/Blockchains/Binance.svg'
import Cronos from 'assets/images/Blockchains/Cronos.svg'
import ETH from 'assets/images/Blockchains/Ethereum.svg'
import FANTOM from 'assets/images/Blockchains/Fantom.svg'
import MATIC from 'assets/images/Blockchains/Matic.svg'
import Avatar from 'components/Avatar'

export const shortAddress = (address, length) => {
  try {
    return `${address.substring(0, length)}...${address.substring(address.length - length)}`
  } catch (error) {
    return '-'
  }
}

const explorerURLS = {
  56: 'https://bscscan.com',
  1: 'https://etherscan.io',
  43114: 'https://snowtrace.io',
  137: 'https://polygonscan.com',
  250: 'https://ftmscan.com',
  25: 'https://cronoscan.com',
  42161: 'https://arbiscan.io',
}

export const getExplorerNames = (chain) => {
  switch (chain) {
    case 1:
      return 'EtherScan'
    case 56:
      return 'BSCScan'
    case 43114:
      return 'SnowTrace'
    case 250:
      return 'FTMScan'
    case 137:
      return 'PolygonScan'
    case 25:
      return 'CronoScan'
    case 42161:
      return 'ArbiScan'
    default:
      return 'Wrong Network'
  }
}

export const getChainName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return 'ETH'
    case 56:
      return 'BSC'
    case 43114:
      return 'AVAX'
    case 250:
      return 'FTM'
    case 137:
      return 'MATIC'
    case 25:
      return 'CRO'
    case 42161:
      return 'ARB'
    default:
      return 'Wrong Network'
  }
}

export const getChainId = (chainName) => {
  // eslint-disable-next-line
  switch (chainName) {
    case 'ETH':
      return 1
    case 'BSC':
      return 56
    case 'AVAX':
      return 43114
    case 'FTM':
      return 250
    case 'MATIC':
      return 137
    case 'CRO':
      return 25
    case 'ARB':
      return 42161
    default:
      return 'Wrong Network'
  }
}

export const getChainFullName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-blue-500 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={ETH} alt='eth' className='w-3' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>ETH</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>ETH</p>
        </div>
      )
    case 56:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-yellow-500 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={BSC} alt='bsc' className='w-4' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex text-zinc-600 dark:text-zinc-300'>Smart Chain</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden text-zinc-600 dark:text-zinc-300'>BSC</p>
        </div>
      )
    case 43114:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-red-500 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={AVAX} alt='avax' className='w-4' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>Avalanche</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>AVAX</p>
        </div>
      )
    case 250:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-blue-400 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={FANTOM} alt='fantom' className='w-3' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>Fantom</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>FTM</p>
        </div>
      )
    case 137:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-purple-500 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={MATIC} alt='matic' className='w-3' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>Polygon</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>MATIC</p>
        </div>
      )
    case 25:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-blue-800 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={Cronos} alt='matic' className='w-3' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>Cronos</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>CRO</p>
        </div>
      )
    case 42161:
      return (
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-blue-600 p-1 rounded-lg w-6 h-6 flex justify-center items-center'>
            <Avatar src={Arbitrum} alt='matic' className='w-3' />
          </div>
          <p className='whitespace-nowrap font-semibold text-sm hidden md:flex'>Arbitrum</p>
          <p className='whitespace-nowrap font-semibold text-sm flex md:hidden'>ARB</p>
        </div>
      )
  }
}

export const getExplorerURL = (type, data, chain) => {
  switch (type) {
    case 'wallet':
      return `${explorerURLS[chain]}/address/${data}`
    case 'tx':
      return `${explorerURLS[chain]}/tx/${data}`
    case 'token':
      return `${explorerURLS[chain]}/token/${data}`
    case 'block':
      return `${explorerURLS[chain]}/block/${data}`
    default:
      return `${explorerURLS[chain]}/`
  }
}

export const noTokenLogo = (chain) => {
  switch (chain) {
    case 'BSC':
      return 'https://bscscan.com/images/main/empty-token.png'
    case 'ETH':
      return 'https://etherscan.io/images/main/empty-token.png'
    case 'AVAX':
      return 'https://snowtrace.io/images/main/empty-token.png'
    case 'FTM':
      return 'https://ftmscan.com/images/main/empty-token.png'
    case 'MATIC':
      return 'https://polygonscan.com/images/main/empty-token.png'
    case 'CRO':
      return 'https://cronoscan.com/images/main/empty-token.png'
    case 'ARB':
      return 'https://arbiscan.io/images/main/empty-token.png?v=1'
    default:
      return ''
  }
}

export const moralisIdToSymbol = (id) => {
  switch (id) {
    case 'eth':
      return 'ETH'
    case 'bsc':
      return 'BSC'
    case 'polygon':
      return 'MATIC'
    case 'avalanche':
      return 'AVAX'
    case 'fantom':
      return 'FTM'
    case 'cronos':
      return 'CRO'
    case 'arbitrum':
      return 'ARB'
    default:
      return ''
  }
}

export const getNFTImage = (url) => {
  if (url !== null) {
    if (String(url).includes('https://meta.space.id/')) {
      const result = String(url).replace('https://meta.space.id/', 'https://meta.image.space.id/image/mainnet/') + '.svg'
      return result
    } else if (String(url).includes('ipfs://')) {
      const result = String(url).replace('ipfs://', 'https://ipfs.io/ipfs/')
      return result
    } else {
      return 'https://react.semantic-ui.com/images/wireframe/image.png'
    }
  } else {
    return 'https://react.semantic-ui.com/images/wireframe/image.png'
  }
}

export const apiErrorFilter = (error) => {
  if (String(error).includes('is not a valid hex address')) {
    return (
      <div className='w-full mt-3'>
        <Alerts variant='warning' text='შეყვანილი მისამართი არასწორია!' />
      </div>
    )
  } else if (error === 'No metadata found! Try again later') {
    return (
      <div className='w-full mt-3'>
        <Alerts variant='warning' text='ვერ მოიძებნა!' />
      </div>
    )
  } else if (String(error).includes('is not registered') && String(error).includes('Domain')) {
    return (
      <div className='w-full mt-3'>
        <Alerts variant='warning' text='სახელი რეგისტრირებული არაა!' />
      </div>
    )
  } else if (error === 404) {
    return (
      <div className='w-full mt-3'>
        <Alerts variant='warning' text='API კავშირი ვერ მოხერხდა! სცადეთ მოგვიანებით!' />
      </div>
    )
  }
}
