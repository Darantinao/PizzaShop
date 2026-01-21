import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe, updateRecipe } from "../ts/Recipes";
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

type RecipesResponse = { recipes: Recipe[] } | undefined;

function Card({ recipe }: CardProps) {

    const [isOverlayOpen, setOverlayOpen] =  useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [formState, setFormState] = useState({
        name: recipe.name,
        image: recipe.image,
        tags: recipe.tags.join(", "),
        instructions: recipe.instructions.join("\n"),
    });

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateRecipe,
        onSuccess: (updatedRecipe) => {
            queryClient.setQueryData<RecipesResponse>(["recipes"], (oldData) => {
                if (!oldData?.recipes) return oldData;

                return {
                    ...oldData,
                    recipes: oldData.recipes.map((r) =>
                        r.id === recipe.id ? { ...r, ...updatedRecipe } : r
                    ),
                };
            });

            setEditOpen(false);
        },
    });

    const openEdit = () => {
        setFormState({
            name: recipe.name,
            image: recipe.image,
            tags: recipe.tags.join(", "),
            instructions: recipe.instructions.join("\n"),
        });
        setEditOpen(true);
    };

    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const preparedTags = formState.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const preparedInstructions = formState.instructions
            .split("\n")
            .map((step) => step.trim())
            .filter(Boolean);

        updateMutation.mutate({
            id: recipe.id,
            name: formState.name,
            image: formState.image,
            tags: preparedTags,
            instructions: preparedInstructions,
        });
    };

    const deleteMutation = useMutation({
        mutationFn: () => deleteRecipe(recipe.id),
        onSuccess: () => {
            queryClient.setQueryData<RecipesResponse>(["recipes"], (oldData) => {
                if (!oldData?.recipes) return oldData;

                return {
                    ...oldData,
                    recipes: oldData.recipes.filter((r) => r.id !== recipe.id),
                };
            });

            setDeleteOpen(false);
        },
    });
    
    return (
        <>
            <div className='flex flex-col h-full w-auto rounded-3xl p-5 m-4 shadow-lg shadow-gray-700 hover:scale-105 duration-300'>
                <img src={recipe.image} className='h-50 rounded-3xl w-full cursor-pointer' onClick={() => setOverlayOpen(true)} ></img>
                <h1 className='font-bold text-center p-3 h-24 text-xl'>{recipe.name}</h1>

                <hr className='border-2 border-black mx-1'/>

                <div className='flex flex-wrap pt-1 justify-center'>
                    {recipe.tags.map((tag: string, index: number) => (
                        <div key={index} className='border-2 border-black w-fit h-auto m-1.5 p-1 rounded-xl text-center text-xs/5'>{tag}</div>
                    ))}
                </div>

                <div className='grid grid-cols-2 gap-4 pl-3 pr-3 mt-auto text-lg'>
                    <button 
                    className="border-2 w-auto rounded-2xl bg-yellow-400 font-medium p-2 cursor-pointer hover:bg-yellow-500 duration-300"
                    onClick={openEdit}
                    >Edit</button>
                    <button 
                    className="border-2 w-auto rounded-2xl bg-red-400 font-medium p-2 cursor-pointer hover:bg-red-500 duration-300"
                    onClick={() => setDeleteOpen(true)}
                    >Delete</button>
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

            <Overlay isOpen={isEditOpen} onClose={() => setEditOpen(false)}>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold">Edit Pizza</h2>

                    <label className="block space-y-1">
                        <span className="text-sm font-semibold">Name</span>
                        <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-sm font-semibold">Image URL</span>
                        <input
                            type="text"
                            value={formState.image}
                            onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-sm font-semibold">Tags (comma separated)</span>
                        <input
                            type="text"
                            value={formState.tags}
                            onChange={(e) => setFormState({ ...formState, tags: e.target.value })}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-sm font-semibold">Instructions (one per line)</span>
                        <textarea
                            value={formState.instructions}
                            onChange={(e) => setFormState({ ...formState, instructions: e.target.value })}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            rows={6}
                        />
                    </label>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="rounded border px-4 py-2"
                            onClick={() => setEditOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 duration-200"
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </Overlay>

            <Overlay isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)}>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Delete this pizza?</h2>
                    <p className="text-gray-700">This removes the recipe from the list.</p>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="rounded border px-4 py-2"
                            onClick={() => setDeleteOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 duration-200"
                            onClick={() => deleteMutation.mutate()}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Overlay>
        </>
    )
}

export default Card;