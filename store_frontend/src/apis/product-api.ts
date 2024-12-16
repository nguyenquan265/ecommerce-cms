import { Product } from '@/type'
import { useQuery } from '@tanstack/react-query'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const STORE_ID = import.meta.env.VITE_STORE_ID

type ProductRequest = {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const useGetAllProductsFromStore = ({
  categoryId = '',
  colorId = '',
  isFeatured = true,
  sizeId = ''
}: ProductRequest) => {
  const getAllProductsRequest = async (): Promise<Product[]> => {
    const res = await fetch(`${SERVER_URL}/api/v1/products/store/${STORE_ID}?isArchived=false
    &categoryId=${categoryId}&colorId=${colorId}&isFeatured=${isFeatured}&sizeId=${sizeId}`)

    if (!res.ok) {
      throw new Error('Failed to get user products')
    }

    return res.json()
  }

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'products',
      {
        categoryId,
        colorId,
        isFeatured,
        sizeId
      }
    ],
    queryFn: getAllProductsRequest
  })

  return { products, isLoading }
}

export const useGetSingleProduct = (productId: string = '') => {
  const getSingleProductRequest = async (): Promise<Product> => {
    const res = await fetch(`${SERVER_URL}/api/v1/products/${productId}`)

    if (!res.ok) {
      throw new Error('Failed to get product')
    }

    return res.json()
  }

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: getSingleProductRequest,
    enabled: productId === 'new' ? false : !!productId
  })

  return { product, isLoading }
}
