import { queryOptions } from "@tanstack/react-query";

function AllRecipes() {
  return queryOptions({
    queryKey: ['recipes'],
    queryFn: getAllRecipes
  })
}

const getAllRecipes = async () => {
  const response = await fetch('https://dummyjson.com/recipes');
  return response.json();
}

type UpdateRecipeInput = {
  id: string | number
  name?: string
  image?: string
  tags?: string[]
  instructions?: string[]
}

export async function updateRecipe(recipe: UpdateRecipeInput) {
  const { id, ...payload } = recipe

  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return res.json()
}

export async function deleteRecipe(id: string | number) {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    method: "DELETE",
  })

  return res.json()
}

export default AllRecipes;