import {setupServer} from 'msw/node'
import ResizeObserver from 'resize-observer-polyfill'
import { handlers } from './handlers'
export const server =setupServer(...handlers)