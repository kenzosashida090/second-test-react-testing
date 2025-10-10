import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductList from "../../src/components/ProductList"
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'
import { afterAll, beforeAll } from 'vitest'
import { db } from '../db'
import AllProviders from '../AllProvider'

describe('ProductList', ()=>{
  let productIds:number[]= []
  beforeAll(()=>{
    [1,2,3,].forEach(()=> {
      const product =  db.product.create()
      productIds.push(product.id)
    })
  })
  afterAll(()=>{
    db.product.deleteMany({where:{id:{in:productIds}}})
  })
  
  
  it('should render the list of products',async()=>{
        render(<ProductList/>, {wrapper:AllProviders})
        const items = await screen.findAllByRole('listitem') // by setting find we asumme that is a async function we will wait till find the list item from an api response
        expect(items.length).toBeGreaterThan(0)
    })
    it('should render no products available if not product found', async()=>{
        server.use(http.get('/products',()=>HttpResponse.json([])))
        render(<ProductList/>, {wrapper:AllProviders})
        const message = await screen.findByText(/no products/i) // expect async response so we set finByText
        expect(message).toBeInTheDocument()
    })
    it('should render error when is invalid the request', async()=>{
        server.use(http.get('/products',()=>HttpResponse.error()))
        render(<ProductList/>, {wrapper:AllProviders})
        const message = await screen.findByText(/error:/i) // expect async response so we set finByText
        expect(message).toBeInTheDocument()
    })
    it('should render the loading component when the fetch its not completed yet', async()=>{
      server.use(http.get('/products', async()=>{
        await delay()
        return HttpResponse.json([])
      }))
      render(<ProductList/>, {wrapper:AllProviders})
      const message = await screen.findByText(/loading.../i)
      expect(message).toBeInTheDocument()
    })
    it('should remove the loading indicator after data is detched', async()=>{
      render(<ProductList/>, {wrapper:AllProviders})
      await waitForElementToBeRemoved(()=>screen.queryByText(/loading/i))
    })
    
})