import { cn } from '@/lib/utils'
import { Image } from '@/type'
import { Tab } from '@headlessui/react'

interface GalleryTabProps {
  image: Image
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className='relative flex items-center justify-center bg-white rounded-md cursor-pointer aspect-square'>
      {({ selected }) => (
        <div>
          <span className='absolute inset-0 w-full h-full overflow-hidden rounded-md aspect-square'>
            <img alt='' src={image.url} className='object-cover object-center' />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent'
            )}
          />
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab
