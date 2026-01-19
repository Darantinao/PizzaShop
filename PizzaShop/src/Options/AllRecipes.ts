import { queryOptions } from "@tanstack/react-query";

function AllRecipes() {
  return queryOptions({
    queryKey: ['recipes'],
    queryFn: getAllRecipes
  })
}

const getAllRecipes = async () => {
  const response = await fetch('https://dummyjson.com/recipes')
                            .then(res => res.json())
                            .then(console.log);

  return await response;
}

export default AllRecipes;