import Sidenav from 'components/SideNav'
import ToastContainer from 'components/Toast/ToastContainer'
import { ToastProvider } from 'context/ToastContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from 'pages/Dashboard'

//APTOS
import AccountChecker from 'pages/APTOS/AccountChecker'
import APTBalance from 'pages/APTOS/APTBalance'
import NFTBalance from 'pages/APTOS/NFTBalance'
import TokenBalance from 'pages/APTOS/TokenBalance'

//EVM
import NativeBalance from 'pages/EVM/NativeBalance'

function App() {
  return (
    <div className='duration-200 min-h-screen bg-darkBackground'>
      <ToastProvider>
        <ToastContainer />
        <BrowserRouter>
          <Sidenav>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/aptos/account' element={<AccountChecker />} />
              <Route path='/aptos/balance' element={<APTBalance />} />
              <Route path='/aptos/tokens' element={<TokenBalance />} />
              <Route path='/aptos/nfts' element={<NFTBalance />} />
              <Route path='/evm/balance' element={<NativeBalance />} />
            </Routes>
          </Sidenav>
        </BrowserRouter>
      </ToastProvider>
    </div>
  )
}

export default App
