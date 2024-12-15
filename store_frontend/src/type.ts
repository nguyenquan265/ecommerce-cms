export type Store = {
  id: string
  name: string
  userId: string
  billboards: Billboard[]
  categories: Category[]
  sizes: Size[]
  colors: Color[]
  products: Product[]
  orders: Order[]
  createdAt: string
  updatedAt: string
}

export type Billboard = {
  id: string
  storeId: string
  store: Store
  categories: Category[]
  label: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  storeId: string
  store: Store
  billboardId: string
  billboard: Billboard
  products: Product[]
  name: string
  createdAt: string
  updatedAt: string
}

export type Size = {
  id: string
  storeId: string
  store: Store
  products: Product[]
  name: string
  value: string
  createdAt: string
  updatedAt: string
}

export type Color = {
  id: string
  storeId: string
  store: Store
  products: Product[]
  name: string
  value: string
  createdAt: string
  updatedAt: string
}

export type Product = {
  id: string
  storeId: string
  store: Store
  categoryId: string
  category: Category
  name: string
  price: number
  isFeatured: boolean
  isArchived: boolean
  sizeId: string
  size: Size
  corlorId: string
  color: Color
  images: Image[]
  orderItems: OrderItem[]
  createdAt: string
  updatedAt: string
}

export type Image = {
  id: string
  productId: string
  product: Product
  url: string
  createdAt: string
  updatedAt: string
}

export type Order = {
  id: string
  storeId: string
  store: Store
  orderItems: OrderItem[]
  isPaid: boolean
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  id: string
  orderId: string
  order: Order
  productId: string
  product: Product
  createdAt: string
  updatedAt: string
}
