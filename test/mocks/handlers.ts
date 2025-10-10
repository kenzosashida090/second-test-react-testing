import { db } from '../db'

export const handlers = [
    ...db.product.toHandlers('rest') //db handle all http request to avoid recreating backend and complex data
]
