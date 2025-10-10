

import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '../../src/routes'

export const navigateTo = (page:string='/')=>{
       const router = createMemoryRouter(routes,{
            initialEntries:[`${page}`]
        })
        render(<RouterProvider router={router}/>)
    }

