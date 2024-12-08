import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '../ui/modal'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useCreateStore } from '@/apis/store-api'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(1)
})

export type CreateStoreFormValues = z.infer<typeof formSchema>

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal()
  const { createStore, isPending } = useCreateStore()
  const navigate = useNavigate()

  const form = useForm<CreateStoreFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (values: CreateStoreFormValues) => {
    const store = await createStore(values)
    onClose()

    if (store) {
      navigate(`/${store.id}`)
    }
  }

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder='E-commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-6 space-x-2 flex items-center justify-end w-full'>
                <Button disabled={isPending} variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={isPending} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
