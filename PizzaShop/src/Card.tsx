import { useState } from "react";
import { Overlay } from "./Overlay";

interface Recipe {
  id: string | number;
  name: string;
  image: string;
  tags: string[];
  instructions: string[];
  [key: string]: unknown;
}

interface CardProps {
  recipe: Recipe;
}

function Card({ recipe }: CardProps) {

    const [isOverlayOpen, setOverlayOpen] =  useState(false);
    
    return (
        <>
            <div className='flex flex-col h-full w-auto rounded-3xl text-2xl p-5 m-4 shadow-lg shadow-gray-700 hover:scale-105 duration-300'>
                <img src={recipe.image} className='h-50 rounded-3xl w-full cursor-pointer' onClick={() => setOverlayOpen(true)} ></img>
                <h1 className='font-bold text-center p-3 align-middle h-24'>{recipe.name}</h1>

                <hr className='border-2 border-black mx-1'/>

                <div className='flex flex-wrap pt-1 justify-center'>
                    {recipe.tags.map((tag: string, index: number) => (
                        <div key={index} className='border-2 border-black w-fit h-auto m-1.5 p-1 rounded-xl text-center text-xs/5'>{tag}</div>
                    ))}
                </div>

                <div className='grid grid-cols-2 gap-4 pl-3 pr-3 mt-auto'>
                    <button className="border-2 w-auto rounded-3xl bg-yellow-400 font-medium p-1 cursor-pointer">Edit</button>
                    <button className="border-2 w-auto rounded-3xl bg-red-400 font-medium p-1 cursor-pointer">Delete</button>
                </div>
            </div>
            
            <Overlay isOpen={isOverlayOpen} onClose={() => setOverlayOpen(!isOverlayOpen)}>
                <div className="w-full text-left space-y-3 pt-2">
                    <ol className="font-bold text-3xl text-center">Instructions</ol>
                    <ol className="space-y-1 text-xl font-medium">
                        {recipe.instructions.map((instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </Overlay>
        </>
    )
}

export default Card;

