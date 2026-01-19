import { queryOptions } from "@tanstack/react-query";

function SortRecipes() {
  return queryOptions({
    queryKey: ['recipes'],
    queryFn: getSortRecipes
  })
}

const getSortRecipes = async () => {
  const response = await fetch('https://dummyjson.com/recipes/search?sortBy=name&order=asc')

  return await response.json()
}

export default SortRecipes;