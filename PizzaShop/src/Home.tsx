import { useQuery } from "@tanstack/react-query";
import Card from "./components/Card.tsx";
import AllRecipes from "./ts/Recipes.ts";
import FilterBar from "./components/Header.tsx";
import { useState } from "react";

interface Recipe {
  id: string | number;
  name: string;
  image: string;
  tags: string[];
  instructions: string[];
  [key: string]: unknown;
}

function Home () {

    const { data, isLoading, error } = useQuery(AllRecipes())
    const [search, setSearch] = useState<string>("")

    if (isLoading) return <div className='justify-center items-center flex h-screen text-6xl font-bold'>Loading...</div>;
    if (error) return <div>Error loading recipes</div>;

    return (
        <>
            <div className="w-full min-h-screen bg-amber-100 ">
                <FilterBar search={search} setSearch={setSearch} />

                <hr className='border-2 border-black mx-16'/>

                <div className='grid grid-cols-5 gap-y-10 p-10'>
                    {data?.recipes?.filter((recipe: Recipe) => 
                        recipe.name.toLowerCase().includes(search.toLowerCase())
                    ).map((recipe: Recipe) => (
                    
                    <Card key={recipe.id} recipe={recipe}/>
                    ))} 
                </div>
            </div>
        </>
    )
}

export default Home;