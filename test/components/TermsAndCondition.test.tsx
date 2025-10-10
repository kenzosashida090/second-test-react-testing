import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from "@testing-library/user-event"
describe("Terms And Condition Test", ()=>{
    it("IT should render properly",()=>{
        render(<TermsAndConditions/>)
        const header = screen.getByRole("heading",{name:/terms & conditions/i})
        screen.debug()
        expect(header).toBeInTheDocument()

        const checkbox = screen.getByRole("checkbox")
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()

        // const button = screen.getByRole("button",{name:/submit/i})
        const button = screen.getByRole("button",)
        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })
    it('should enable the button when de box is checked',async ()=>{
        render(<TermsAndConditions/>)
        const checkbox = screen.getByRole("checkbox")
        const user = userEvent.setup()
        await user.click(checkbox)
        expect(screen.getByRole("button")).toBeEnabled()
    })
})