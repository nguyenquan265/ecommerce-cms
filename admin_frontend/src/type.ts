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
