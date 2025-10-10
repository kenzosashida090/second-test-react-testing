import { render, screen } from '@testing-library/react'
import Greet from "../../src/components/Greet"

describe('Greet', ()=>{
    it('it should render the component greeting with Hello and the name that we provide',()=>{
        render(<Greet name='John'/>) // Render the compoent
        screen.debug() // Create a print for the actual DOM test
        const heading = screen.getByRole("heading")
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/hello John/i) //regular expression
        
    })
    it('it should render login button when no name is provided',()=>{
        render(<Greet/>) // Render the compoent
        screen.debug() // Create a print for the actual DOM test
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/login/i) //regular expression

    })
})