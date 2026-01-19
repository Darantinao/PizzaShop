import { queryOptions } from "@tanstack/react-query";

function RecipesByTags () {
    return queryOptions({
        queryKey: ['recipe'],
        queryFn: getRecipesByTags
    })
}

const getRecipesByTags = async () => {
  const response = await fetch('https://dummyjson.com/recipes/tag/Pakistani')

  return await response.json()
}

export default RecipesByTags;