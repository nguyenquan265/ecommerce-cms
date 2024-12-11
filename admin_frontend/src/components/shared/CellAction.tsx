import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { BillboardColumn } from './Columns'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteBillboard } from '@/apis/billboard-api'
import { useState } from 'react'
import AlertModal from '../modals/AlertModal'

interface CellActionProps {
  data: BillboardColumn
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { storeId } = useParams()
  const [open, setOpen] = useState(false)
  const { deleteBillboard, isPending } = useDeleteBillboard(storeId, data?.id)
  const navigate = useNavigate()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)

    toast.success('Billboard ID copied to clipboard')
  }

  const onDelete = async () => {
    await deleteBillboard()

    setOpen(false)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isPending} />

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

          <DropdownMenuItem onClick={() => navigate(`/${storeId}/billboards/${data.id}`)}>
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
