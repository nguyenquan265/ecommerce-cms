import { Billboard, Category } from '@/type'
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
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/apis/category-api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1)
})

export type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: Category
  billboards: Billboard[]
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { createCategory, isPending: isCreating } = useCreateCategory(storeId)
  const { updateCategory, isPending: isUpdating } = useUpdateCategory(storeId, initialData?.id)
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory(storeId, initialData?.id)
  const navigate = useNavigate()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '', billboardId: '' }
  })

  const onSubmit = async (values: CategoryFormValues) => {
    if (initialData) {
      await updateCategory(values)
    } else {
      await createCategory(values)
    }

    navigate(`/${storeId}/categories`)
  }

  const onDelete = async () => {
    await deleteCategory()
    setOpen(false)

    navigate(`/${storeId}/categories`)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Edit category' : 'Create category'}
          description={initialData ? 'Edit a category' : 'Add a new category'}
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
                    <Input disabled={isCreating || isUpdating || isDeleting} placeholder='Category name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='billboardId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isCreating || isUpdating || isDeleting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm
