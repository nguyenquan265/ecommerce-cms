import { Store } from '@/type'
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
import { useDeleteStore, useUpdateStore } from '@/apis/store-api'
import AlertModal from '../modals/AlertModal'
import { useNavigate } from 'react-router-dom'
import ApiAlert from '../shared/ApiAlert'

const formSchema = z.object({
  name: z.string().min(1)
})

export type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const { updateStore, isPending: isUpdating } = useUpdateStore(initialData.id)
  const { deleteStore, isPending: isDeleting } = useDeleteStore(initialData.id)
  const navigate = useNavigate()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const onSubmit = async (values: SettingsFormValues) => {
    await updateStore(values)
  }

  const onDelete = async () => {
    await deleteStore()
    setOpen(false)

    navigate('/')
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage store preferences' />

        <Button disabled={isUpdating || isDeleting} variant='destructive' size='sm' onClick={() => setOpen(true)}>
          <Trash className='h-4 w-4' />
        </Button>
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
                    <Input disabled={isUpdating || isDeleting} placeholder='Store name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' disabled={isUpdating || isDeleting} className='ml-auto'>
            Save changes
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title='PUBLIC_API_URL'
        description={`${import.meta.env.VITE_SERVER_URL}/api/v1/stores/${initialData.id}`}
        variant='public'
      />
    </>
  )
}

export default SettingsForm
