import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import AllRecipes from "./options/AllRecipes";

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipes</div>;

    return (
        <>
            <div className="w-full h-full bg-amber-100 ">
                <div className='text-5xl font-bold text-center p-10'>
                    <input type='text' className='border-2 rounded-2xl text-center p-3' placeholder="Search..."></input>
                </div>

                <hr className='border-2 border-black mx-16'/>

                <div className='grid grid-cols-4 gap-1 p-10'>
                    {data?.recipes?.map((recipe: Recipe) => (
                        <Card key={recipe.id} recipe={recipe}/>
                    ))} 
                </div>
            
            </div>
        </>
    )
}

export default Home;