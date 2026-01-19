
function Home () {
    return (
        <>
            <div className="w-full h-full bg-amber-100 ">
                <div className='text-5xl font-bold text-center p-10'>
                    <input type='text' className='border-2 rounded-2xl text-center p-3' placeholder="Search..."></input>
                </div>

                <hr className='border-2 border-black mx-16'/>
                <div className='grid grid-cols-4 gap-1 p-10'>
                    <div className='w-auto h-auto rounded-3xl text-2xl p-5 m-5 shadow-lg shadow-gray-700 hover:scale-105 duration-300'>
                        <img src='https://cdn.dummyjson.com/recipe-images/2.webp' className='h-50 rounded-3xl w-full'></img>
                        <h1 className='font-bold text-center p-3 '>Tasty Pizza</h1>

                        <hr className='border-2 border-black mx-1'/>

                        <div className='flex flex-wrap pb-1 pt-1 justify-center'>
                            <div className='border-2 border-black w-fit h-auto m-3 p-1 rounded-xl text-center text-xs/5'>asdasdas</div>
                            <div className='border-2 border-black w-fit h-auto m-3 p-1 rounded-xl text-center text-xs/5'>sdsd</div>
                            <div className='border-2 border-black w-fit h-auto m-3 p-1 rounded-xl text-center text-xs/5'>tsdsdad</div>
                            <div className='border-2 border-black w-fit h-auto m-3 p-1 rounded-xl text-center text-xs/5'>sdsdsd</div>
                            <div className='border-2 border-black w-fit h-auto m-3 p-1 rounded-xl text-center text-xs/5'>tags</div>
                        </div>

                        <div className='grid grid-cols-2 gap-4 pl-3 pr-3'>
                            <button className="border-2 w-auto rounded-3xl bg-yellow-400 font-medium p-1">Edit</button>
                            <button className="border-2 w-auto rounded-3xl bg-red-400 font-medium p-1">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;