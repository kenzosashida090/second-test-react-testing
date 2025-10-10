import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, expect } from 'vitest'
import QuantitySelector from "../../src/components/QuantitySelector"
import { Product } from '../../src/entities'
import AllProviders from '../AllProvider'
import { db } from '../db'
describe("Cart test", ()=>{

   let productIds:number[]= []
   let productId:Product[] = []
  beforeAll(()=>{
    [1,2,3,].forEach(()=> {
      const product =  db.product.create()
      productIds.push(product.id)
      productId.push(product)
    })
  })
  afterAll(()=>{
    db.product.deleteMany({where:{id:{in:productIds}}})
  })
    const renderComponent = ()=>{
        render(<QuantitySelector product={productId[0]}/>,{wrapper:AllProviders})
        const button = screen.getByRole('button',{name:/cart/i})
        const user = userEvent.setup()
        const status = async ()=> await screen.findByRole('status')
        const decrementButton = async()=> await screen.findByRole('button', {name:/-/i} )
        const incrementButton = async()=> await screen.findByRole('button', {name:"+"} )
        const addToCart = async ()=> {
            const button = screen.getByRole('button', {name:/cart/i})
            user.click(button)
        }
        const increaseQuantity = async()=>{
            const inc = await screen.findByRole('button', {name:"+"} )
            await user.click(inc)
            return
        }
        const decreaseQuantity = async()=>{
            const dec = await screen.findByRole('button', {name:"-"} )
            await user.click(dec)
            return
        }
        return{button, user, status, decrementButton, incrementButton, addToCart, increaseQuantity, decreaseQuantity}
    }
    it("should render button",()=>{
        const {button} = renderComponent() 
        expect(button).toBeInTheDocument()
    })
    it("should add to cart ", async()=>{
        const {addToCart,status, button} = renderComponent()
        await addToCart()
        const buttonText = await  status()
        expect(buttonText).toHaveTextContent(/1/i)

    })
    it("should increase 1", async()=>{
        const {status, addToCart, increaseQuantity} = renderComponent()
        await addToCart()
        await increaseQuantity()
        const buttonText = await  status()
        expect(buttonText).toHaveTextContent(/2/i)


    })
    it("should decrease 1", async()=>{
        const {status, addToCart,increaseQuantity, decreaseQuantity} = renderComponent()
        await addToCart()
        await increaseQuantity()
        await decreaseQuantity()
        const statusText = await  status()
        expect(statusText).toHaveTextContent(/1/i)
    })
    it("should return initial state button when counter 0", async()=>{
        const { decreaseQuantity, addToCart} = renderComponent()
        await addToCart()
        await decreaseQuantity()
        const initialButton = await screen.findByRole('button',{name:/cart/i})
        expect(initialButton).toBeInTheDocument()
    })
})

