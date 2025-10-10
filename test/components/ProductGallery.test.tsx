import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'
describe("ProductGalleryTest", ()=>{
    it("It no sould be render nothing when product gallery array is null", ()=>{
        const {container} =   render(<ProductImageGallery imageUrls={[]}/>)
        expect(container).toBeEmptyDOMElement()
    })
    it("it should reneder the url images array", ()=>{
        const imagesUrl = ["hola", "adios"]
        render(<ProductImageGallery imageUrls={imagesUrl}/>)
        const image = screen.getAllByRole("img")
        expect(image).toHaveLength(2)
        imagesUrl.forEach((url,indx)=>{
            expect(image[indx]).toHaveAttribute("src",url)
        })
        
        
    })
})