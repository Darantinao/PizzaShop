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

export default AllRecipes;