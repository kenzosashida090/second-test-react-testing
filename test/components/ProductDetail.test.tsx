import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { delay, http, HttpResponse } from 'msw'
import ProductDetail from '../../src/components/ProductDetail'
import AllProviders from '../AllProvider'
import { db } from '../db'
import { server } from '../mocks/server'

describe('Product DETAIL', ()=>{
    let productIds:number=0
    beforeAll(()=>{
      const product =  db.product.create()
    productIds = product.id
    })
    afterAll(()=>{
      db.product.delete({where:{id:{equals:productIds}}})
    })
    
    it('should return the product detrail 1 ', async()=>{
        const product = db.product.findFirst({where:{id:{equals:productIds}}})
        render(<ProductDetail productId={productIds}/>,{wrapper:AllProviders})
        let name:{} ={}
        
        name =  await screen.findByText(new RegExp(product!.name))
        const price = await screen.findByText(new RegExp(product!.price.toString()))
        expect(name).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        

    })
    it('should return product not foundresponse when no id found', async()=>{
        
        server.use(http.get('/products/1', ()=> HttpResponse.json(null)))
        render(<ProductDetail productId={1}/>,{wrapper:AllProviders})
        const text = await screen.findByText(/not found/i)
         expect(text).toBeInTheDocument()
    })
    // it('should return error not found response when no id found', async()=>{
    //     server.use(http.get('/products/1', ()=>  HttpResponse.error()))
    //   render(<ProductDetail productId={productIds}/>,{wrapper:AllProviders})
    //     const text = await screen.findByText(/error:/i)
    //      expect(text).toBeInTheDocument()

    // })
    it('should render the loading component when data is fetching',async()=>{
        server.use(http.get('/products/1',async ()=> {
            await delay() 
            return HttpResponse.json([])
        }))
        render(<ProductDetail productId={productIds}/>,{wrapper:AllProviders})
        const text = await screen.findByText(/loading/i)
        expect(text).toBeInTheDocument()
    })
    it('should remove the loading state when data is fetched',async()=>{
        render(<ProductDetail productId={productIds}/>,{wrapper:AllProviders})
        await waitForElementToBeRemoved(()=> screen.queryByText(/loading/i))
    })
})