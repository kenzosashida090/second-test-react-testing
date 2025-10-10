import { render, screen } from '@testing-library/react'
import ExpandableText from "../../src/components/ExpandableText"
import userEvent from "@testing-library/user-event"
describe("ExpandableText Test",()=>{
    const limit = 255
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque amet perspiciatis voluptate? Hic illo vero incidunt ab soluta quaerat adipisci odio quibusdam corporis quis, quo nostrum consectetur aspernatur tempora deleniti consequuntur, voluptatem provident natus magni repellendus molestiae recusandae iusto voluptas! Cupiditate deleniti laborum odio harum nesciunt ut quaerat eius consectetur nam, ratione blanditiis velit sapiente dicta officiis tempore dolores neque corrupti voluptate exercitationem repellat vero voluptas quod? Doloremque, beatae quidem dolorem, mollitia molestiae natus aut labore voluptates rerum debitis omnis libero minus recusandae. At aspernatur, odit rem tempore quibusdam iure id architecto obcaecati blanditiis alias aliquam nihil quasi perspiciatis neque laborum nobis vitae minus iste maxime? Sapiente harum quidem corrupti, ipsam deleniti temporibus repudiandae pariatur repellat? Necessitatibus dolorem molestias perferendis est sit earum, excepturi, impedit nobis sunt corporis libero quasi totam qui ipsam consequuntur repellat ipsum culpa quod? Pariatur ex suscipit nobis aliquam iure optio ad aspernatur nihil ab magni magnam veritatis mollitia excepturi enim eius aperiam, illum ipsa doloremque ea ratione praesentium quia, unde atque culpa? Iste harum atque vero dolor quam voluptatem, velit consequuntur debitis, est officiis, blanditiis ex facere dicta nihil? Tenetur debitis iure et, provident eos aut sapiente, magni repellat adipisci at dignissimos nesciunt voluptas id voluptatem illum incidunt nisi eum itaque exercitationem. Fuga omnis minima sapiente! Praesentium at assumenda, quo et, a voluptatum cumque voluptate ad hic expedita eos iusto iure. Inventore non suscipit, molestiae natus facere voluptatibus assumenda esse, quod voluptatum error labore fugiat dicta perferendis molestias. Eos, molestias veritatis impedit inventore quam mollitia consequuntur quidem minus eaque placeat facere, alias iste reiciendis. Vitae, possimus. Natus, doloremque. Iste molestiae fugit velit eaque minus? Nihil aliquid totam quam voluptates est ut blanditiis voluptatibus quo esse architecto explicabo inventore ab dolores eos eligendi, optio quidem sed modi. Illo quam a debitis dolorem laudantium fugit, facilis repellendus!" 
    it("should render the full text when the length < 255",()=>{
        const text= "prueba123"
        render(<ExpandableText text={text}/>)
        const button = screen.queryByRole("button")
        const article = screen.getByRole("article")
         expect(button).not.toBeInTheDocument()
         expect(article).toBeInTheDocument()
         expect(article).toHaveTextContent("prueba123") 
         expect(screen.getByText(text)).toBeInTheDocument()

    })
    it("should render initial state text with length > 255",()=>{
        render(<ExpandableText text={text}/>)
        const button = screen.getByRole("button", {name:/show more/i})
        const finalText = text.substring(0,limit)
        const article = screen.getByRole("article")
        expect(button).toBeInTheDocument()
        expect(article).toHaveTextContent(`${finalText}...`)
    })
    it("should show the complete text when button click ", async ()=>{
        render(<ExpandableText text={text}/>)
        const button = screen.getByRole("button",{name:/show more/i})
        const user = userEvent.setup()
        await user.click(button)
        const newButton = screen.getByRole("button", {name:/show less/i})
        expect(newButton).toBeInTheDocument()
        const article = screen.getByRole("article")
        expect(screen.getByText(text)).toBeInTheDocument()
        expect(text.length).toEqual(article.innerHTML.length)
    })
})