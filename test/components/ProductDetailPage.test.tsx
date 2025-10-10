import { render, screen } from '@testing-library/react'
import { db } from '../db'
import { Product } from '../../src/entities'
import { navigateTo } from './navigateTo'
describe('product detail page',()=>{
    let product:Product
    beforeAll(()=>{
        product = db.product.create()
    })
    afterAll(()=>  db.product.delete({where:{id:{equals:product.id}}}))
    it('should render product',async()=>{
       navigateTo(`/products/${product.id}`)
        expect(await screen.findByRole('heading',{name:product.name})).toBeInTheDocument()
        expect(await screen.findByText(`$${product.price}`)).toBeInTheDocument()
    })
})