import {Link,useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../Perks";
import axios from 'axios';

export default function PlacesPage(){
    const {action}= useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [pic,setPic]=useState([]);
    const [photoLink,setPhotoLink]=useState('')
    const [description,setDescription]=('')
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);

    function inputHeader(text){
      return(
         <h2 className="text-2xl mt-4">{text}</h2>
      );
    }
    function inputDescription(text){
      return(
         <p className="text-gray-500 text-sm">{text}</p>
      );
    }
    function preInput(header,description){
      return(
         <>
         {inputHeader(header)}
         {inputDescription(description)}

         </>
         
      );
    }

    async function addPicLink(ev){
      ev.preventDefault();
      const {data:filename} = await axios.post('/upload-by-link',{link: photoLink});
      setPic(prev =>{
         return [...prev,filename];
      });
      setPhotoLink('');
    }

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
                  {preInput('Title','Should be short and catchy')}
                   <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="title"/>
                   {preInput('Address','Address to this place')}
                   <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)}placeholder="address"/>
                   {preInput('Photos','Add nice pics of hotel')}

                   <div className="flex gap-2">
                     <input value={photoLink} 
                     onChange={ev => setPhotoLink(ev.target.value)}
                     type="text" placeholder={'Add using link..jpg'}>  
                     </input>
                     <button onClick={addPicLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
                   </div>
                   <div className="mt-2 grid grid-cols-3  md:grid-cols-4 lg:grid-cols-6">
                   
                   {pic.length > 0 && pic.map(link => (
                     <div>
                        {/* {link} */}
                        <img src={'http://localhost:4000/uploads/'+link} alt=""/>
                     </div>
                   ))}
                   
                   <button className=" flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                   </svg>

                    Upload
                   </button>
                   </div>
                   {preInput('Description','Description of place')}
                   
                   <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
                   {preInput('Perks','Select all the perks of your place')}
                   <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks}/>
                    </div>

                   <h2 className="text-xl mt-4">Extra info</h2>
                   <p className="text-gray-500 text-sm">house rules,etc</p>
                   <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                   <h2 className="text-xl mt-4">Check in&out times,max guests</h2>
                   <p className="text-gray-500 text-sm">add check in and out times,remember to have some time window for cleaning the room between guests</p>

                   <div className="grid sm:grid-cols-3 mt-2">
                     <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)} 
                        placeholder="14:00"/>
                     </div>
                     <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)}
                         placeholder="14:00"/>
                     </div>
                     <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="text" value={maxGuests} 
                        onChange={ev => setMaxGuests(ev.target.value)}
                        placeholder="11"/>
                     </div>
                   </div>

                   <div>
                     <button className="primary mt-4 ">Save</button>
                   </div>
                </form>
            </div>
           
          )}
        {/* my places */}
        </div> 
        
        
    )
}