import { useState, useEffect, type FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRecipe } from "../ts/Recipes"
import { Overlay } from "./Overlay"

interface Recipe {
    id: string | number
    name: string
    image: string
    tags: string[]
    instructions: string[]
    [key: string]: unknown
}

interface FilterBarProps {
    search: string
    setSearch: (value: string) => void
}

type RecipesResponse = { recipes: Recipe[] } | undefined

const FilterBar: React.FC<FilterBarProps> = ( { search, setSearch } ) => {
    const [inputValue, setInputValue] = useState(search);
    const [isAddOpen, setAddOpen] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        image: "",
        tags: "",
        instructions: "",
    });

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createRecipe,
        onSuccess: (createdRecipe) => {
            queryClient.setQueryData<RecipesResponse>(["recipes"], (oldData) => {
                if (!oldData?.recipes) {
                    return { recipes: [createdRecipe] } as RecipesResponse;
                }

                return {
                    ...oldData,
                    recipes: [createdRecipe, ...oldData.recipes],
                };
            });

            setAddOpen(false);
            setFormState({ name: "", image: "", tags: "", instructions: "" });
        },
    });

    useEffect(() => {
        const timer = setTimeout(() => setSearch(inputValue), 300)
        return () => clearTimeout(timer)
    }, [inputValue, setSearch]);

    const handleAddSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const preparedTags = formState.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const preparedInstructions = formState.instructions
            .split("\n")
            .map((step) => step.trim())
            .filter(Boolean);

        createMutation.mutate({
            name: formState.name,
            image: formState.image,
            tags: preparedTags,
            instructions: preparedInstructions,
        });
    };

    return (
        <>
            <div className="inline-flex w-full justify-end items-center rounded-b-3xl pr-10">
                <h1 className="text-8xl font-extrabold pr-30 font-serif">PizzaShop</h1>
                <div className='text-3xl font-bold text-center p-10'>
                    <input 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        type='text' 
                        className='border-2 rounded-2xl text-center p-3' 
                        placeholder="Search...">   
                    </input>
                </div>
                <button 
                    className="border-2 m-5 rounded-2xl w-35 p-4 bg-green-400 text-lg font-bold hover:bg-green-500 duration-300 cursor-pointer"
                    type="button"
                    onClick={() => setAddOpen(true)}>Add Pizza
                </button>
            </div>

            <Overlay isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold">Add Pizza</h2>

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
                            onClick={() => setAddOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 duration-200"
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </Overlay>
        </>
    )
}

export default FilterBar;