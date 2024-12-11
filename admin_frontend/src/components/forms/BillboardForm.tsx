import { Billboard } from '@/type'
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
import { useCreateBillboard, useUpdateBillboard, useDeleteBillboard } from '@/apis/billboard-api'
import AlertModal from '../modals/AlertModal'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUpload from '../ui/image-upload'

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

export type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData?: Billboard
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { createBillboard, isPending: isCreating } = useCreateBillboard(storeId)
  const { updateBillboard, isPending: isUpdating } = useUpdateBillboard(storeId, initialData?.id)
  const { deleteBillboard, isPending: isDeleting } = useDeleteBillboard(storeId, initialData?.id)
  const navigate = useNavigate()

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: '', imageUrl: '' }
  })

  const onSubmit = async (values: BillboardFormValues) => {
    if (initialData) {
      await updateBillboard(values)
    } else {
      await createBillboard(values)
    }

    navigate(`/${storeId}/billboards`)
  }

  const onDelete = async () => {
    await deleteBillboard()
    setOpen(false)

    navigate(`/${storeId}/billboards`)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Edit billboard' : 'Create billboard'}
          description={initialData ? 'Edit a billboard' : 'Add a new billboard'}
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                    value={field.value ? [field.value] : []}
                    disabled={isCreating || isUpdating || isDeleting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='label'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Billboard label' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isCreating || isUpdating || isDeleting} className='ml-auto'>
            {initialData ? 'Save changes' : 'Create'}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  )
}

export default BillboardForm
