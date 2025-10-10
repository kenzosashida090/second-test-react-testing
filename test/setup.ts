import "@testing-library/jest-dom/vitest"
import ResizeObserver from 'resize-observer-polyfill'
import { PropsWithChildren } from "react";
import {server} from "./mocks/server"
import { afterAll, beforeAll, vi, afterEach  } from 'vitest'
   beforeAll(()=>server.listen()) // start up server mock msw
   afterEach(()=> server.restoreHandlers()) //each test will run clean
   afterAll(()=> server.close()) // close  server after all tsts
  // Mretunockin functions for library ui
    vi.mock('@auth0/auth0-react',()=>{
      return {
        useAuth0:vi.fn().mockReturnValue({
          isAuthenticated:false,
          isLoading:false,
          user:undefined
        }),
        Auth0Provider:({children}:PropsWithChildren)=>children,
        withAuthenticationRequired:(component:ReactNode)=>component,
      }
    })
   global.ResizeObserver = ResizeObserver

    // In your setup file or individual test file
// Mockin functions for library ui
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // Default to false, or adjust based on your test case
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated but often still present
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });