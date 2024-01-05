import {Link,useParams} from "react-router-dom";

export default function PlacesPage(){
    const {action}= useParams();
    return(
        <div>
            {action !== 'new' && (
               <div className="text-center ">
               <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full mt-8" to={'/account/places/new'}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
                 Add new place
                 
                
               </Link>
                 
             </div>
            )}
          {action === 'new' && (
            <div> 
                <form>
                   <h2 className="text-xl mt-4">Title</h2>
                   <p className="text-gray-500 text-sm">Should be short and catchy</p>
                   <input type="text" placeholder="title"/>
                   <h2 className="text-xl mt-4">Address</h2>
                   <p className="text-gray-500 text-sm">Address to this place</p>
                   <input type="text" placeholder="address"/>
                   <h2 className="text-xl mt-4">Photos</h2>
                   <p className="text-gray-500 text-sm">Add nice pics of hotel</p>
                   <div className="flex">
                     <input type="text" placeholder={'Add using link..jpg'}></input>
                     <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
                   </div>
                   <div className="grid grid-cols-3  md:grid-cols-4 lg:grid-cols-6">
                   <button className=" flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                   </svg>

                    Upload
                   </button>
                   </div>
                   <h2 className="text-2xl mt-4"></h2>
                </form>
            </div>
           
          )}
        my places
        </div> 
        
        
    )
}