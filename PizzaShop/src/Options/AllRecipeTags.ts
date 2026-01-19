import { queryOptions } from "@tanstack/react-query";

function AllRecipeTags() {
    return queryOptions({
        queryKey: ['recipe'],
        queryFn: getAllRecipeTags
    })
}

const getAllRecipeTags = async () => {
  const response = await fetch('https://dummyjson.com/recipes/tags')

  return await response.json()
}

export default AllRecipeTags;