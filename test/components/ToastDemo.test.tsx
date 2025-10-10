import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToastDemo from "../../src/components/ToastDemo"
import { Toaster } from 'react-hot-toast'
describe('ToastDemo', () => {
    const setup = ()=>{
         const renderComponent = render(
         <>
         <ToastDemo/>
        <Toaster/>
         </>
        )
        const button = screen.getByRole('button',{name:/show toast/i})
        return{
            button,
            renderComponent
        }
    }
    it('should rendcer show toast button', ()=>{
        const {button } = setup()
       expect(button).toBeInTheDocument()
        // userEvent.type
    })
    it('should rendcer a toaster boton', async ()=>{
        const {button, } = setup()
       expect(button).toBeInTheDocument()
        const userClick = userEvent.setup()
        await userClick.click(button)
        const toaster = await screen.getByText(/success/i)

        expect(toaster).toBeInTheDocument()
    })
    
})