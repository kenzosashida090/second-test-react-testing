import { Theme } from '@radix-ui/themes'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderStatusSelector from "../../src/components/OrderStatusSelector"
import { act } from 'react'

        
describe('OrderStatusSelector test', ()=>{ 
    const testSetup = ()=>{
        const onChange = vi.fn()
        render(
                <Theme>
            <OrderStatusSelector onChange={onChange}/>
        </Theme>
    )  
    const button = screen.getByRole('combobox')
    const user = userEvent.setup()
    return{
        button, 
        user,
        options: ()=> screen.findAllByRole('option'),
        getOption: async(label:RegExp) => await screen.findByRole('option',{name:label}), 
        onChange
    }    
    
}
// await user.click(button)
// //   expect(button).toHaveTextContent(/new/i )
//     const labels = options.map((option)=> option.textContent)
//     expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])
it('render ui library  component',()=>{
    const {button} = testSetup()
    expect(button).toBeInTheDocument()
})
it('render ui library  component with the default value', ()=>{
    const {button} = testSetup()
    expect(button).toHaveTextContent(/new/i )
})
it('should render the three options of the select component', async()=>{
        const {options,user,button} = testSetup()
        await user.click(button)
        const optionsArray = await options()
        const labels= optionsArray.map((option)=>option.textContent)
        expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])

    })

it.each([
    {label:/processed/i, value:'processed'},
    {label:/fulfilled/i, value:'fulfilled',}
])('should render $label when user select that option $value',async({label,value})=>{
    const {onChange, user, button, getOption} = testSetup()
    await user.click(button)
    const option =await getOption(label)
    await user.click(option)
    expect(onChange).toHaveBeenCalledWith(value)
})

})  

