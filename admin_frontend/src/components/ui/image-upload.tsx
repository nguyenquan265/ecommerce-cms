// Custom modal component

import { ImagePlus, Trash } from 'lucide-react'
import { Button } from './button'
import { useEffect, useRef } from 'react'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const cloudinaryRef = useRef<any>()
  const widgetRef = useRef<any>()

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dxx85izni',
        uploadPreset: 'ecommerce-cms'
      },
      function (error: any, result: any) {
        if (result.event === 'queues-end') {
          const urlList = result.info.files.map((file: any) => file.uploadInfo.secure_url)

          urlList.forEach((url: string) => {
            onChange(url)
          })
        }

        if (error) {
          console.error(error)
        }
      }
    )
  }, [])

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <Button type='button' onClick={() => onRemove(url)} variant='destructive' size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>

            <img src={url} alt='image' className='object-cover w-full h-full' />
          </div>
        ))}
      </div>

      <Button type='button' disabled={disabled} variant='secondary' onClick={() => widgetRef.current.open()}>
        <ImagePlus className='h-4 w-4 mr-2' /> Upload an Image
      </Button>
    </div>
  )
}

export default ImageUpload
