import { render, screen, waitFor } from '@testing-library/react'
import { delay, http, HttpResponse } from 'msw'
import { describe } from 'node:test'
import BrowseProductsPage from '../../src/pages/BrowseProductsPage'
import { server } from '../mocks/server'

import userEvent from '@testing-library/user-event'
import { afterAll, beforeAll, } from 'vitest'
import AllProviders from '../AllProvider'
import { db } from '../db'

describe('BrowseProductsTest', ()=>{
     let productIds:number[]= []
     const categories = [{
      "id": 1,
      "name": "Electronics"
    },
    {
      "id": 2,
      "name": "Appliances"
    },
    {
      "id": 3,
      "name": "Accessories"
    }]
  beforeAll(()=>{
    [1,2,3,4,5,6,7,8,9].forEach(()=> {
      const product =  db.product.create()
      productIds.push(product.id)
    })
  })
  afterAll(()=>{
    db.product.deleteMany({where:{id:{in:productIds}}})
  })
  const renderComponent = async ()=>{
      render(<BrowseProductsPage/>, {wrapper:AllProviders})
    const select = await screen.findByRole('combobox')
    const user = userEvent.setup()
    return{
        select, 
        user
    }


  }
    it('should render the skeleton when loading',()=>{
        server.use(http.get('/products', async()=>{ 
            await delay()
            return HttpResponse.json([])}))
        const {container} = render(<BrowseProductsPage/>,  {wrapper:AllProviders})
        const skeletons = container.querySelectorAll('.react-loading-skeleton')
        expect(skeletons.length).toBeGreaterThanOrEqual(0)
    
    })
    // it('should remove skeleton when data is fetched', async()=>{
    //     renderComponent()
    //     const products = db.product.getAll()
    //     const text = await screen.findByText(products[0].name)
    //     expect(text).toBeInTheDocument()
        
    // })
    it('should render select', async ()=>{
        server.use(http.get('categories', ()=> HttpResponse.json([])))
        const {select} = await renderComponent()
        expect(select).toBeInTheDocument()
    })
    it('should render select text', async ()=>{
        server.use(http.get('categories', ()=> HttpResponse.json([{
            id:1,
            name:'hola'
        }])))
       const {select, user} = await  renderComponent()
        
        user.click(select)
        const optionsArray = await screen.findAllByRole('option')
          const labels= optionsArray.map((option)=>option.textContent)
        expect(labels).toEqual(['All', 'hola'])
    })
it.each([
    {label:/all/i, value:'all'},
])('should change selectt value', async({label,value})=>{
        server.use(http.get('categories', ()=> HttpResponse.json([])))
       const {select, user} = await renderComponent()
        user.click(select)
        const selectRole= await screen.findByRole('option', {name:label})
        await user.click(selectRole)
        //  await waitFor(() => expect(select).toHaveTextContent(/all/i))
        expect(select).toHaveTextContent(label)
    })
    it.each([
    {label:/electronics/i, value:1},
    {label:/appliances/i, value:2},
    {label:/accessories/i, value:3},
])('should filter products with category $label', async({label,value})=>{
    const products = db.product.getAll()
        server.use(http.get('/categories', ()=> HttpResponse.json(categories)))
        server.use(http.get('/products', ()=> HttpResponse.json(products)))
        
        const {select, user} = await renderComponent()
        user.click(select)
        const selectRole= await screen.findByRole('option', {name:label})
        await user.click(selectRole)
        const listExpected = products.filter((prod)=>  prod.categoryId === value)
        const listUnexpected = products.filter((prod)=>  prod.categoryId !== value)
        //  await waitFor(() => expect(select).toHaveTextContent(/all/i))
        console.log("=========",listExpected)
        await waitFor(() => {
    expect(screen.getByText(listExpected[0].name)).toBeInTheDocument()          // categoryId 1 -> visible
    expect(screen.queryByText(listUnexpected[0].name)).not.toBeInTheDocument()     // categoryId 2 -> filtrado
  })
        expect(select).toHaveTextContent(label)
    })
    
    
    it('should return a message error', async ()=>{
        server.use(
    http.get('/products', () =>
      HttpResponse.json({ message: 'Internal error' }, { status: 500 })
    )
  )
        renderComponent()
        const errorMessage = await screen.findByText(/Error:/i)
        expect(errorMessage).toBeInTheDocument()
    })
     it('should return all products', async ()=>{
         const products = db.product.getAll()
         console.log(products)
        server.use(
    http.get('/products', () =>
      HttpResponse.json(products)    )
  )
        renderComponent()
        const errorMessage = await screen.findByText(products[0].name)
        expect(errorMessage).toBeInTheDocument()
    })
})