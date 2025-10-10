import { render, screen } from '@testing-library/react'
import { mockAuthState } from '../utils'
import AuthStatus from "../../src/components/AuthStatus"
import AllProviders from '../AllProvider'
describe("AuthStatus test", ()=>{
    const authType = {
            isAuthenticated:false,
            isLoading:false,
            user:undefined
    }
    it('should render loading state', ()=>{
        mockAuthState({...authType, isLoading:true})
        render(<AuthStatus/>,{wrapper:AllProviders})
        const loadingText = screen.getByText(/loading/i)
        expect(loadingText).toBeInTheDocument()
    })
    it('should render login button', async()=>{
        mockAuthState({...authType})
        render(<AuthStatus/>,{wrapper:AllProviders})
        const loadingText = await screen.findByRole('button',{name:/log in/i})
        expect(loadingText).toBeInTheDocument()
    })
    it('should render username', async()=>{
        mockAuthState({...authType,isAuthenticated:true, user:{name:'kenzo'}})
        render(<AuthStatus/>,{wrapper:AllProviders})
        const loadingText = await screen.findByText(/kenzo/i)
        expect(loadingText).toBeInTheDocument()
    })
})