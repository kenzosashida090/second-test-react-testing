import ProductForm from "../components/ProductForm";

const PlaygroundPage = () => {
  return(
    <ProductForm onSubmit={async()=>console.log("hola")}/>
    )
};

export default PlaygroundPage;
