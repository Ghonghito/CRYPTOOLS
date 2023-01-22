import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Typography from 'components/Typography'
import Alert from 'components/Alerts'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { getEVMNativeBalance } from 'utils/APIs/MoralisAPI'
import { shortAddress } from 'utils/Helpers'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [balances, setBalances] = useState([])
  const toast = useToast()
  const checkAptBalance = async () => {
    const address = document.getElementById('aptosWalletAddress').value
    setIsLoading(true)
    setBalances([])
    if (address === '' || address === null || address === undefined) {
      toast('error', 'Please enter wallet address or addresses')
    } else {
      if (String(address).includes(',')) {
        const addressList = String(address).split(',')
        const data = await getEVMNativeBalance(addressList, true)
        setBalances(data)
      } else {
        const data = await getEVMNativeBalance(address, false)
        setBalances(data)
      }
    }
    setIsLoading(false)
  }

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className='w-full md:w-[550px]'>
          <Card className='p-2'>
            <div className='flex flex-col md:flex-row md:items-center gap-2'>
              <Input id='aptosWalletAddress' placeholder='wallet address or separte with commas' />
              <Button onClick={() => checkAptBalance()} loading={isLoading}>
                CHECK
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className='flex items-center justify-center mt-2'>
        {Object.keys(balances).length > 0 && (
          <div className='w-full md:w-[550px]'>
            {balances.status === 200 ? (
              <Card>
                <div className='overflow-y-auto'>
                  <table className='border-collapse table-auto w-full text-sm text-left '>
                    <thead className='text-gray-500 text-xs'>
                      <tr>
                        <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                          #
                        </th>
                        <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                          Chain
                        </th>
                        <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                          Address
                        </th>
                        <th scope='col' className='duration-150 border-b border-darkBorder px-6 py-3'>
                          Native Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(balances.data).map((x, index) => (
                        <tr key={index} className='w-full cursor-pointer duration-150 hover:bg-darkBorder'>
                          <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                            <Typography>{index + 1}</Typography>
                          </th>
                          <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                            <Typography>{x.chainName}</Typography>
                          </th>
                          <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                            <Typography>{shortAddress(x.address, 5)}</Typography>
                          </th>
                          <th className='duration-150 border-b border-darkBorder px-6 py-4'>
                            <Typography>{x.balance}</Typography>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <div>
                <Alert variant={balances.statusCode} text={balances.errorText} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
