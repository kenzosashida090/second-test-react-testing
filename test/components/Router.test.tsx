import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { navigateTo } from './navigateTo'
import { Product } from '../../src/entities'
import { db } from '../db'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'
// import { navigateTo } from './navigateTo'
describe('Router test',()=>{
      let productTest:Product
        beforeAll(()=>{
          const product =  db.product.create()
        productTest = product
        })
        afterAll(()=>{
          db.product.delete({where:{id:{equals:productTest.id}}})
        })
        
    it('should render the home page for /',()=>{
        navigateTo()
        expect(screen.getByRole('heading',{name:/home/i})).toBeInTheDocument()
    })
    it('should render the products page for /products',()=>{
        navigateTo('/products')
        expect(screen.getByRole('heading',{name:/products/i})).toBeInTheDocument()
    })
    it('should render error page',()=>{
        navigateTo('/this-is-not-a-url')
        expect(screen.getByRole('heading',{name:/oops/i})).toBeInTheDocument()
    })
    
    it('should render the products page for /admin',async ()=>{
        navigateTo(`/admin`)
        // await waitForElementToBeRemoved(()=>screen.queryByText(/loading/i))
        console.log(screen.debug())
        expect(screen.getByRole('heading',{name:/admin/i})).toBeInTheDocument()
    })

})