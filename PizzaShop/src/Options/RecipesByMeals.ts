import { queryOptions } from "@tanstack/react-query";

function RecipesByMeals () {
    return queryOptions({
        queryKey: ['recipes'],
        queryFn: getRecipesByMeals
    })
}

const getRecipesByMeals = async () => {
  const response = await fetch('https://dummyjson.com/recipes/meal-type/snack')

  return await response.json()
}

export default RecipesByMeals;