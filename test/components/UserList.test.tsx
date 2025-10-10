import { render, screen } from '@testing-library/react'
import UserList from '../../src/components/UserList'
import {User} from "../../src/entities"
describe('UserList', ()=> {
    it('should not render no users when the users array is empty', ()=>{
        render(<UserList users={[]}/>)
        expect(screen.getByText(/no users/i)).toBeInTheDocument()
    })
    it('should render users when the users array is empty', ()=>{
        const users : User[] = [
            {id:1, name:"Kenzo", isAdmin:true},
            {id:2, name:"Alejandro", isAdmin:false}
        ]
        render(<UserList users={users}/>)
        users.forEach((val)=>{
            const link = screen.getByRole("link", {name:val.name})
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute("href",`/users/${val.id}`)
        })
       
    })

})