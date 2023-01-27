import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { checkAccountData } from 'utils/APIs/AptosAPI'
import { shortAddress } from 'utils/Helpers'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [multipleAddressCount, setMultipleAddressCount] = useState(0)
  const [accountsData, setAccountsData] = useState([])

  const toast = useToast()

  const checkAccount = async () => {
    const address = document.getElementById('aptosWalletAddress').value
    if (address === '' || address === null || address === undefined) {
      toast('error', 'Please enter wallet address or addresses')
    } else {
      setIsLoading(true)
      setAccountsData([])
      setMultipleAddressCount(0)
      if (String(address).includes(',')) {
        const addresses = String(address).split(',')
        setMultipleAddressCount(Object.keys(addresses).length)
        const getData = await checkAccountData(addresses)
        console.log(getData)
        setAccountsData(getData)
      } else {
        const getData = await checkAccountData(Array(address))
        setAccountsData(getData)
      }
    }
    setIsLoading(false)
    console.log(accountsData)
  }

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className='w-full lg:w-[550px] xl:w-[600px]'>
          <Card title='ACCOUNT CHECKER'>
            <div className='p-2'>
              <div className='mb-2 bg-darkBackground p-1 rounded-md border-[1px] border-darkBorder'>
                <Typography color='text-gray-500'>Check one or multiple wallet addresses at once.</Typography>
                <Typography color='text-gray-500'>
                  Separate multiple wallet addresses with <span className='text-primary'>commas</span>.
                </Typography>
              </div>
              <div className='flex flex-col md:flex-row md:items-center gap-2'>
                <Input onKeyDown={(e) => e.key === 'Enter' && checkAccount()} id='aptosWalletAddress' placeholder='wallet address or addresses and separate them with commas' />
                <Button onClick={() => checkAccount()} loading={isLoading}>
                  CHECK
                </Button>
              </div>
              {multipleAddressCount !== 0 && (
                <div className='mt-2'>
                  <Typography>Detected {multipleAddressCount} Address</Typography>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className='flex items-center justify-center mt-2'>
        {Object.keys(accountsData).length > 0 && (
          <div className='w-full lg:w-[550px] xl:w-[600px]'>
            <Card>
              <div className='overflow-y-auto'>
                <table className='border-collapse table-auto w-full text-sm text-left '>
                  <thead className='text-gray-500 text-xs'>
                    <tr>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        #
                      </th>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        Address
                      </th>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        APT Balance
                      </th>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        Tokens
                      </th>
                      <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                        NFTs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsData.map((y, index) => (
                      <tr key={y.address} className='w-full cursor-pointer duration-150 hover:bg-darkBorder'>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{index + 1}</Typography>
                        </th>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{shortAddress(y.address, 6)}</Typography>
                        </th>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{y.data.getAptBalance.status === 200 ? y.data.getAptBalance.data[0].balance : 'ERROR'}</Typography>
                        </th>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{y.data.getTokensBalance.status === 200 && Object.keys(y.data.getTokensBalance.data).length > 0 ? Object.keys(y.data.getTokensBalance.data[0].data).length : 0}</Typography>
                        </th>
                        <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                          <Typography>{y.data.getNftsBalance.status === 200 && Object.keys(y.data.getNftsBalance.data[0].data).length > 0 ? Object.keys(y.data.getNftsBalance.data[0].data).length : 0}</Typography>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index