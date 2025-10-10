import userEvent from "@testing-library/user-event"
import SearchBox from "../../src/components/SearchBox"
import { render, screen } from "@testing-library/react"
import {vi} from "vitest"
describe('Searchbox test', () => {
    //    const fn = vi.fn(e:string)=>{
    //         console.log(e, "===========")
    //     }
    const setup = () => {
        const onChange = vi.fn()
        const utils = render(<SearchBox onChange={onChange}/>)
        const input =screen.getByPlaceholderText('Search...')
         const user = userEvent.setup()
        return{
            utils,
            input,
            user,
            onChange,
        }
    }
    it('should render the input and validate input to expect what we wrote', ()=>{
        const {input} = setup()
        expect(input).toBeInTheDocument()
    })
    it('should call onCHange when enter is pressed', async()=>{
        const {input, onChange, user} = setup()
        await user.type(input, 'hola{enter}') 
        // expect(input).toHaveValue('hola')E
        expect(onChange).toHaveBeenCalledWith('hola')
        // screen.debug()
    })
    it('should not call onCHange when enter is pressed', async()=>{
        const {onChange,} = setup()       
        // expect(input).toHaveValue('hola')E
        expect(onChange).not.toHaveBeenCalled() // this is toHaveBeenCalled because no argument we pass to it so it be spy function
        // screen.debug()
    })
})
