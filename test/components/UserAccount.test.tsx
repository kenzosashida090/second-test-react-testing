import { render, screen } from '@testing-library/react'
import UserAccount from "../../src/components/UserAccount"
describe("User Account", ()=>{
    it("It should render only the user name because the user is not admin ", ()=>{
        const user = {
            id:12,
            name:"Johnny",
            isAdmin:false
        }
        render(<UserAccount user={user}/>)
        const button = screen.queryByRole("button") // getByRole will set an error because it doesnt exist
        expect(button).not.toBeInTheDocument()
        screen.debug() // Create a print for the actual DOM test
    })

    it("it should render the button edit when its admin ", ()=>{
        const user = {
            id:12,
            name:"Johnny",
            isAdmin:true
        }
        render(<UserAccount user={user}/>)
        const button = screen.getByRole("button")
        expect(button).toHaveTextContent(/edit/i)
    })
    it("it should render the user name", ()=> {
        const user = {
            id:12,
            name:"Johnny",
            isAdmin:true
        }
        render(<UserAccount user={user}/>)
          screen.debug() // Create a print for the actual DOM test
          expect(screen.getByText(user.name)).toBeInTheDocument()
    })
})