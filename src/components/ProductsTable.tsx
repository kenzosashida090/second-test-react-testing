import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../entities";
import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import QuantitySelector from "./QuantitySelector";

interface Props{
    selectedCategoryId: number | undefined
}
function ProductsTable({selectedCategoryId}:Props) {
    const queryProducts = useQuery({
    queryKey:['/products'],
    queryFn: async()=>  await axios.get<Product[]>("/products").then((res)=> res.data)
  })
     const {isLoading, error, data:products} = queryProducts
    const skeletons = [1, 2, 3, 4, 5];

    if (error) return <div>Error: There was an error fetching your products</div>;
    const visibleProducts = selectedCategoryId
      ? products!.filter((p) => p.categoryId === selectedCategoryId)
      : products;

    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading &&
            skeletons.map((skeleton) => (
              <Table.Row key={skeleton}>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            ))}
          {!isLoading &&
            visibleProducts!.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>
                  <QuantitySelector product={product} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    );
}

export default ProductsTable
