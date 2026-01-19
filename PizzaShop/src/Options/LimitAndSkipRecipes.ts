import { queryOptions } from "@tanstack/react-query";

function LimitAndSkipRecipes() {
  return queryOptions({
    queryKey: ['recipes'],
    queryFn: getLimitAndSkipRecipes
  })
}

const getLimitAndSkipRecipes = async () => {
  const response = await fetch('https://dummyjson.com/recipes?limit=10&skip=10&select=name,image')

  return await response.json()
}

export default LimitAndSkipRecipes;