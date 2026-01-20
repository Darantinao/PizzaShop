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
        <div className='text-5xl font-bold text-center p-10'>
            <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                type='text' 
                className='border-2 rounded-2xl text-center p-3' 
                placeholder="Search...">   
            </input>
        </div>
    )
}

export default FilterBar;