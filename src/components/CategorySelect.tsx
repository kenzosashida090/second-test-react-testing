import { Select } from "@radix-ui/themes"
import { Category } from "../entities";
import { useQuery } from "react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

interface Props {
  setSelectedCategoryId: (status: number | undefined) => void;
}

function CategorySelect({setSelectedCategoryId}:Props) {
    const queryCategories= useQuery({
    queryKey:['/categories'],
    queryFn: async()=>  await axios.get<Category[]>("/categories").then((res)=> res.data)
  })
        const {isLoading, data:categories, error} = queryCategories
        if (isLoading) return <Skeleton />;
        if (error) return <div>Error: There was an error fetching your categories</div>;
    return (
        <Select.Root
        onValueChange={(categoryId) =>
          setSelectedCategoryId(parseInt(categoryId))
        }
      >
        <Select.Trigger placeholder="Filter by Category" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Category</Select.Label>
            <Select.Item value="all">All</Select.Item>
            {categories?.map((category) => (
              <Select.Item key={category.id} value={category.id.toString()}>
                {category.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    )
}

export default CategorySelect
