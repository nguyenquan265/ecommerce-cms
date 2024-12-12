export type Store = {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type Billboard = {
  id: string
  storeId: string
  store: Store
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
  name: string
  createdAt: string
  updatedAt: string
}

export type Size = {
  id: string
  storeId: string
  store: Store
  name: string
  value: string
  createdAt: string
  updatedAt: string
}
