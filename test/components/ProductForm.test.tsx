import { render, screen, waitFor } from '@testing-library/react'
import ProductForm from '../../src/components/ProductForm'
import AllProviders from '../AllProvider'
import { afterAll, beforeAll, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'
import { db } from '../db'
import { Product } from '../../src/entities'
import { Toaster } from 'react-hot-toast'
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
describe('ProducrForm test',()=>{
    let productDb:Product 
   beforeAll(()=>{
    const product = db.product.create()
    productDb= product
   })
   afterAll(()=>{
     db.product.delete({where:{id:{equals:productDb.id}}})
   })
   const testStart = async(product?: Product)=>{
     const onSubmit = vi.fn()
     render(
     <>
      <ProductForm product={product} onSubmit={onSubmit}/>
      <Toaster/>
     </>
     
     ,{wrapper:AllProviders})
    const form = await screen.findByRole('form')
    const name = screen.getByPlaceholderText(/name/i)
    const price = screen.getByPlaceholderText(/price/i)
    const select = screen.getByRole('combobox', {name:/category/i})
    const button = screen.getByRole('button', {name:/submit/i})
      const user = userEvent.setup()
    const fill = async (nameScenario, priceScenario, )=> {
         if(nameScenario !== undefined) await user.type(name,nameScenario)
        if(priceScenario !== undefined) await user.type(price,priceScenario)
        await user.tab()
        await user.click(select)
        const options = screen.getAllByRole('option')
        await user.click(options[0])
        await user.click(button)

    }
    return{
        name, price, select, user, form, fill, onSubmit, button
    }
   }
    it('should render form fields',  async()=>{
     
        server.use(http.get('/categories',()=>HttpResponse.json(categories)))
        
        const {name,price, select, user} =  await testStart()
        
      
        expect(name).toBeInTheDocument() // find textbox by placing arial-label or by placeholder 
        expect(price).toBeInTheDocument()
        expect(select).toBeInTheDocument()
        user.click(select)
        const options =  await screen.findAllByRole('option')
        const labels = options.map((option)=> option.textContent)
        expect(labels).toEqual(['Electronics', 'Appliances', 'Accessories'])
    })
    it('should render a form field with the inital data of the product', async()=>{
        const {name,price, select } =  await testStart(productDb)
        expect(name).toHaveValue(productDb.name)
        expect(price).toHaveValue(String(productDb.price))
        expect(select).toHaveTextContent(categories[productDb.categoryId -1].name)

    })
    it('should focus', async()=>{
        // const onSubmit = ()=> vi.fn()
        const {name } =  await testStart()
        expect(name).toHaveFocus()
    })
    it('shouldnt have focus', async()=>{
        const {price} = await testStart()
        expect(price).not.toHaveFocus()
    })
    it.each([
      {
        scenario: 'missing',
        errorMessage:/required/i,
        price:"300"
      },
      {
        scenario: 'longer than 255 chareacters',
        name: 'a'.repeat(256),
        errorMessage:/255/i,
        price:"10"
      },
      {
        scenario:'set a string',
        price:"hola",
        name:'TV',
        errorMessage:/required/i
      },
      {
        scenario:'longer than 1000',
        price:"2000",
        name:'TV',
        errorMessage:/1000/i
      },
      {
        scenario:'longer than 1',
        price:"0",
        name:'TV',
        errorMessage:/1/i
      },

    ])('shoould display error validation if $scenario', async({name: nameScenario,errorMessage, price:priceScenario})=>{
        const {fill} = await testStart()
        await fill(nameScenario, priceScenario)
                const error = screen.getByRole('alert')
        expect(error).toBeInTheDocument()
        expect(error).toHaveTextContent(errorMessage)
    })
    it('should call on submit with correct data when submit', async()=>{
              const {fill, onSubmit} = await testStart()
        await fill(productDb.name, String(productDb.price))
        const validData = {
         
            categoryId:1,
            name:productDb.name, 
            price:productDb.price
        }
        expect(onSubmit).toHaveBeenCalledWith(validData)
    })
    it('should call a toaster when submit fails', async()=>{
        const {fill, onSubmit} = await testStart()
        onSubmit.mockRejectedValue({})
        await fill(productDb.name, String(productDb.price))
        const alert = await screen.findByRole('status')
        expect(alert).toBeInTheDocument()
        expect(alert).toHaveTextContent(/unexpected/i)
          })
    it('should disable button', async()=>{
        const {fill, onSubmit, button} = await testStart()
        onSubmit.mockReturnValue(new Promise(()=>{}))
        await fill(productDb.name, String(productDb.price)) 
        
        expect(button).toBeDisabled()
          })
    it('should re-nable  button when reolvedo value', async()=>{
        const {fill, onSubmit, button} = await testStart()
        onSubmit.mockResolvedValue({})
        await fill(productDb.name, String(productDb.price)) 
        
        expect(button).not.toBeDisabled()
          })
    it('should re-nable  button when error occured', async()=>{
        const {fill, onSubmit, button} = await testStart()
        onSubmit.mockRejectedValue({})
        await fill(productDb.name, String(productDb.price)) 
        
        expect(button).not.toBeDisabled()
          })
})