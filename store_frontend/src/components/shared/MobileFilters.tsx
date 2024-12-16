import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Filter from './Filter'
import Button from './Button'
import IconButton from './IconButton'
import { Color, Size } from '@/type'

interface MobileFiltersProps {
  sizes: Size[]
  colors: Color[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button className='flex items-center gap-x-2 lg:hidden' onClick={onOpen}>
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} as='div' className='relative z-40 lg:hidden' onClose={onClose}>
        {/* Background */}
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        {/* Dialog Position */}
        <div className='fixed inset-0 z-40 flex'>
          <DialogPanel className='relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl'>
            {/* Close Button */}
            <div className='flex items-center justify-end px-4'>
              <IconButton icon={<X size={15} onClick={onClose} />} />
            </div>

            {/* Render the filters */}
            <div className='p-4'>
              <Filter valueKey='sizeId' name='Sizes' data={sizes} />
              <Filter valueKey='colorId' name='Colors' data={colors} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default MobileFilters
