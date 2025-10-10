

import {useAuth0 } from "@auth0/auth0-react"
import { createMemoryRouter, RouterProvider,  } from "react-router-dom";
import { vi } from "vitest";
import routes from '../src/routes'
import { render,  } from '@testing-library/react'
 vi.mock('@auth0/auth0-react')
type AuthState = {
    isAuthenticated:boolean;
    isLoading:boolean;
    user:any;
}

export const mockAuthState = (authState:AuthState)=>{
    vi.mocked(useAuth0).mockReturnValue({
        ...authState,
        getAccessTokenSilently:vi.fn(),
        getAccessTokenWithPopup: vi.fn(),
        getIdTokenClaims:vi.fn(),
        loginWithRedirect:vi.fn(),
        loginWithPopup: vi.fn(),
        logout:vi.fn(),
        handleRedirectCallback: vi.fn()
    })
}
export const navigateTo = (page:string='/')=>{
       const router = createMemoryRouter(routes,{
            initialEntries:[`${page}`]
        })
        render(<RouterProvider router={router}/>)
    }

