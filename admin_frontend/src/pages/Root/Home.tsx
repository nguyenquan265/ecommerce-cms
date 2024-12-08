import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'

const HomePage = () => {
  const { isOpen, onOpen } = useStoreModal()

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return <div className='p-4'>HomePage</div>
}

export default HomePage
