import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const billboardsColumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} type='billboards' />
  }
]

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const categoriesColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} type='categories' />
  }
]

export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const sizesColumns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} type='sizes' />
  }
]

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const colorsColumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.value}
        <div className='h-6 w-6 rounded-full border' style={{ backgroundColor: row.original.value }} />
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} type='colors' />
  }
]

export type ProductColumn = {
  id: string
  name: string
  isFeatured: boolean
  isArchived: boolean
  price: string
  category: string
  size: string
  color: string
  createdAt: string
}

export const productsColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured'
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.color}
        <div className='h-6 w-6 rounded-full border' style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} type='products' />
  }
]
