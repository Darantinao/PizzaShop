import { useState, useEffect } from "react"

interface FilterBarProps {
    search: string
    setSearch: (value: string) => void
}

const FilterBar: React.FC<FilterBarProps> = ( { search, setSearch } ) => {
    const [inputValue, setInputValue] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => setSearch(inputValue), 300)
        return () => clearTimeout(timer)
    }, [inputValue, setSearch]);

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
                    onClick={() => console.log("hello")}>Add Pizza
                </button>
            </div>
        </>
    )
}

export default FilterBar;