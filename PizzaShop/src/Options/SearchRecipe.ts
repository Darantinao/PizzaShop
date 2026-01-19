import { queryOptions } from "@tanstack/react-query";

function SearchRecipe () {
    return queryOptions({
        queryKey: ['recipe'],
        queryFn: getSearchRecipe
    })
}

const getSearchRecipe = async () => {
  const response = await fetch('https://dummyjson.com/recipes/search?q=Margherita')

  return await response.json()
}

export default SearchRecipe;