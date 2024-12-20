import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { BillboardColumn, CategoryColumn, ProductColumn, SizeColumn } from './Columns'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteBillboard } from '@/apis/billboard-api'
import { useState } from 'react'
import AlertModal from '../modals/AlertModal'
import { useDeleteCategory } from '@/apis/category-api'
import { useDeleteSize } from '@/apis/size-api'
import { useDeleteColor } from '@/apis/color-api'
import { useDeleteProduct } from '@/apis/product-api'

interface CellActionProps {
  data: BillboardColumn | CategoryColumn | SizeColumn | ProductColumn
  type: 'billboards' | 'categories' | 'sizes' | 'colors' | 'products'
}

const CellAction: React.FC<CellActionProps> = ({ data, type }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { deleteBillboard, isPending: isBillboardDeleting } = useDeleteBillboard(storeId, data?.id)
  const { deleteCategory, isPending: isCategoryDeleting } = useDeleteCategory(storeId, data?.id)
  const { deleteSize, isPending: isSizedeleting } = useDeleteSize(storeId, data?.id)
  const { deleteColor, isPending: isColorDeleting } = useDeleteColor(storeId, data?.id)
  const { deleteProduct, isPending: isProductDeleting } = useDeleteProduct(storeId, data?.id)
  const navigate = useNavigate()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)

    toast.success('ID copied to clipboard')
  }

  const onDelete = async () => {
    if (type === 'billboards') {
      await deleteBillboard()
    }

    if (type === 'categories') {
      await deleteCategory()
    }

    if (type === 'sizes') {
      await deleteSize()
    }

    if (type === 'colors') {
      await deleteColor()
    }

    if (type === 'products') {
      await deleteProduct()
    }

    setOpen(false)
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isBillboardDeleting || isCategoryDeleting || isSizedeleting || isColorDeleting || isProductDeleting}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 h-4 w-4' />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => navigate(`/${storeId}/${type}/${data.id}`)}>
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
