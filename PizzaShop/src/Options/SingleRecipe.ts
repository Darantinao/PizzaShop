import { queryOptions } from "@tanstack/react-query";

function SingleRecipe () {
    return queryOptions({
        queryKey: ['recipes'],
        queryFn: getSingleRecipe
    })
}

const getSingleRecipe = async () => {
  const response = await fetch('https://dummyjson.com/recipes/1')

  return await response.json()
}

export default SingleRecipe;