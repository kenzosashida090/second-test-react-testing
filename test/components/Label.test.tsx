import { render, screen } from '@testing-library/react'
import Label from "../../src/components/Label"
import {LanguageProvider }from "../../src/providers/language/LanguageProvider"
import en from "../../src/providers/language/data/en.json"
import  es from "../../src/providers/language/data/es.json"
import AllProviders from '../AllProvider'
import { expect } from 'vitest'
describe(('Label test'), ()=> {
       const valuesEn = Object.keys(en)
        
    it('should return error when language provider is not set',()=>{
        try{
            render(<Label labelId="welcome" />)
        }catch(error){
           expect(error.message).toBe(`getLabel is not a function`)
        }
        
    })
    it('should return error because donstn have this in the dictionary',()=>{
        const text ="goodbye"
        try{
            render(
                <LanguageProvider language="en">
            <Label labelId={text}/>
        </LanguageProvider>,{wrapper:AllProviders}
        )
        }catch(error){
            expect(error.message).toBe(`LabelID ${text} not found in en.json`)
         
        }
    })
    it.each(valuesEn)('should have all dictionary " %s " en',(valueEn:string)=>{
            render(
                <LanguageProvider language="en">
            <Label labelId={valueEn.toLowerCase()}/>
        </LanguageProvider>,{wrapper:AllProviders}
        )
        const text= screen.getByText(en[valueEn])
        expect(text).toBeInTheDocument()
    })
    it.each(valuesEn)('should render " %s " es',(valueEn:string)=>{
            render(
                <LanguageProvider language="es">
            <Label labelId={valueEn.toLowerCase()}/>
        </LanguageProvider>,{wrapper:AllProviders}
        )
        const text= screen.getByText(es[valueEn])
        expect(text).toBeInTheDocument()
    })

    
})