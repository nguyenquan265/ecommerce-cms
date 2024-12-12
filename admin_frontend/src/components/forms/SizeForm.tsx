import { Size } from '@/type'
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
import AlertModal from '../modals/AlertModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateSize, useDeleteSize, useUpdateSize } from '@/apis/size-api'

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1)
})

export type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
  initialData?: Size
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { createSize, isPending: isCreating } = useCreateSize(storeId)
  const { updateSize, isPending: isUpdating } = useUpdateSize(storeId, initialData?.id)
  const { deleteSize, isPending: isDeleting } = useDeleteSize(storeId, initialData?.id)
  const navigate = useNavigate()

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', value: '' }
  })

  const onSubmit = async (values: SizeFormValues) => {
    if (initialData) {
      await updateSize(values)
    } else {
      await createSize(values)
    }

    navigate(`/${storeId}/sizes`)
  }

  const onDelete = async () => {
    await deleteSize()
    setOpen(false)

    navigate(`/${storeId}/sizes`)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Edit size' : 'Create size'}
          description={initialData ? 'Edit a size' : 'Add a new size'}
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Size name' {...field} />
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
                    <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Size value' {...field} />
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

export default SizeForm
