import { Color } from '@/type'
import Heading from '../shared/Heading'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '../ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'
import { Input } from '../ui/input'
import { useCreateColor, useUpdateColor, useDeleteColor } from '@/apis/color-api'
import AlertModal from '../modals/AlertModal'
import { useNavigate, useParams } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: 'String must be a valid hex color code'
  })
})

export type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
  initialData?: Color
}

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { createColor, isPending: isCreating } = useCreateColor(storeId)
  const { updateColor, isPending: isUpdating } = useUpdateColor(storeId, initialData?.id)
  const { deleteColor, isPending: isDeleting } = useDeleteColor(storeId, initialData?.id)
  const navigate = useNavigate()

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', value: '' }
  })

  const onSubmit = async (values: ColorFormValues) => {
    if (initialData) {
      await updateColor(values)
    } else {
      await createColor(values)
    }

    navigate(`/${storeId}/colors`)
  }

  const onDelete = async () => {
    await deleteColor()
    setOpen(false)

    navigate(`/${storeId}/colors`)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Edit color' : 'Create color'}
          description={initialData ? 'Edit a color' : 'Add a new color'}
        />

        {initialData && (
          <Button
            disabled={isCreating || isUpdating || isDeleting}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Color name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-x-4'>
                      <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Color value' {...field} />
                      <div className='border p-4 rounded-full' style={{ backgroundColor: field.value }} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isCreating || isUpdating || isDeleting} className='ml-auto'>
            {initialData ? 'Save changes' : 'Create'}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  )
}

export default ColorForm
