import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);

    useEffect(()=> {
        if(id) {
           axios.get('/bookings').then(response =>{
            const foundBooking = response.data.find(({_id}) => _id === id);
            if(foundBooking) {
                setBooking(foundBooking);
            }
           });
        }
    },[id]);

    if(!booking){
        return '';
    }
    return(
        <div className="my-8"> 
            <h1 className="text-2xl">{booking.place.title} </h1>
            <AddressLink className= "my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
                <div>
                <h2 className="text-xl mb-2">Your booking information:</h2>
                <BookingDates booking={booking}></BookingDates>
                </div>
                <div className="bg-primary p-2 text-white rounded-2xl">
                     
                    <div className="text-1xl">Total price</div>
                    <div className="text-2xl">{booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}