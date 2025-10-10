import { faker } from '@faker-js/faker'
import {factory, primaryKey} from '@mswjs/data'

//setup a fake db from mswjs data managment fake db
export const db = factory({
    product: {
        id:primaryKey(faker.number.int),
        name:faker.commerce.productName,
        price: ()=> faker.number.int({min:1, max:100}),
        categoryId: ()=>faker.number.int({min:1,max:3})
        
    },

    
})