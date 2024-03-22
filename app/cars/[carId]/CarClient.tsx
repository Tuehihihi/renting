'use client'

import axios from "axios";
import { categories } from "@/app/components/navbar/Categories";
import { SafeCar, SafeReservation, SafeUser } from "@/app/types";

import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "@/app/components/Container";
import CarHead from "@/app/components/cars/CarHead";
import CarInfo from "@/app/components/cars/CarInfo";
import CarReservation from "@/app/components/cars/CarReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays ,eachDayOfInterval } from "date-fns";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};
interface CarClientProps{
    reservations?: SafeReservation[];
    car: SafeCar & {
        user: SafeUser
    };
    currentUser?: SafeUser | null
}

const CarClient: React.FC<CarClientProps> = ({
    car,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();
    const {
        register,
       
        formState: {
            errors,
        },
        
    }=useForm<FieldValues>({
        defaultValues: {
           takeLocation: ''
        }
    });
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            })
            dates = [ ...dates, ...range];
        });
        return dates
    },[reservations]);

    const [isLoading,setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(car.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [takeLocation, setTakeLocation] = useState('');

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            takeLocation,
            carId: car?.id
        })
        .then(() => {
            toast.success('Thuê thành công')
            setDateRange(initialDateRange);
            
            router.push('/rents');
        })
        .catch(() => {
            toast.error('Hỏng');
        })
        .finally(() => {
            setIsLoading(false);
        })
    },[totalPrice,dateRange,car?.id, router,currentUser,loginModal,takeLocation])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );
            
            if(dayCount && car.price) {
                setTotalPrice((dayCount + 1) * car.price);
            }else{
                setTotalPrice(car.price);
            }
        }
    },[dateRange, car.price])
    const category = useMemo(() => {
        return categories.find((item) => 
        item.label ===car.category);
    },[car.category])
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-5">
                    <CarHead 
                        title = {car.title}
                        imageScr ={car.imageScr}
                        locationValue = {car.locationValue}
                        id = {car.id}
                        currentUser = {currentUser}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 mt-5">
                    <div className="flex flex-col md:w-full">
                    <CarInfo 
                        user= {car.user}
                        category = {category}
                        description = {car.description}
                        guestCount = {car.guestCount}
                        seatCount = {car.seatCount}
                        locationValue = {car.locationValue}
                    />  
                    <hr />
                    <input id="takeLocation" placeholder="Điểm đón" 
                    className="peer w-full p-1 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed" 
                    onChange={(event) => setTakeLocation(event.target.value)}
                    />              
                    </div>
                    <div className="order-first mb-9 md:order-last md:col-span-1">
                        <CarReservation 
                            price= {car.price}
                            totalPrice = {totalPrice}
                            onChangeDate = {(value) => setDateRange(value)}
                            dateRange = {dateRange}
                            onSubmit = {onCreateReservation}
                            disabled = {isLoading}
                            disabledDates = {disabledDates}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default CarClient;