import { render, screen,  } from '@testing-library/react'
import TagList from "../../src/components/TagList"
describe('TagList test', () => {
    // const setup = ()=>{
    //     const lisItems = 
    test('should reneder list items (tags)', async()=>{
        //this is an async function cause TagList items has an asyncronouse list that fetch (simulated)
        render(<TagList/>)
        // await waitFor(()=>{
        //     const listItems = screen.getAllByRole('listitem')
        //     expect(listItems.length).toBeGreaterThan(0)
        // }) awaitFor WILL CALl the function a until reach 1 sec the calling function has an interval of 50ms.

        const listItems = await screen.findAllByRole('listitem')
        expect(listItems.length).toBeGreaterThan(0)
    })
})

