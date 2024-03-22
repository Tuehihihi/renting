'use client';
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range } from "react-date-range";

import ProvinceSelect, {ProvinceSelectValue} from "../inputs/ProvinceSelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}
const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [location, setLocation] = useState<ProvinceSelectValue>()

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [seatCount, setSeatCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key : 'selection'
    });

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() =>{
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if(step !==STEPS.INFO){
            return onNext();
        }

        let currentQuery = {};

        if(params) {
            currentQuery =qs.parse(params.toString())
        }

        const updateQuery: any = {
            ... currentQuery,
            locationValue: location?.value,
            guestCount,
            seatCount,
        };

        if(dateRange.startDate) {
            updateQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[ step,searchModal,location,router,guestCount,seatCount,dateRange,onNext,params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return 'Tìm kiếm';
        }

        return 'Tiếp';
    },[step]);
    
    const secondaryActionLabel = useMemo(() => {
        if(step ===STEPS.LOCATION){
            return undefined;
        }

        return 'Trở lại'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6" >
            <Heading 
                title="Chỗ bạn ở gần đâu"
                subtitle="Hãy để chúng tôi biết và chọn cơ sở gần bạn"
            />
            <ProvinceSelect 
                value={location}
                onChange={(value)=>
                setLocation(value as ProvinceSelectValue) 
                }
            />
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
         <div className="flex flex-col gap-6">
            <Heading 
                title="Khi nào bạn sẽ dùng"
                subtitle="Chúng tôi sẽ tìm xe trống cho bạn!"
            />
            <Calendar 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
         </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading 
                    title="Thêm thông tin"
                    subtitle="Chúng tôi sẽ tìm xe phù hợp cho bạn"
                />
                <Counter 
                title="Guests"
                subtitle="Có bao nhiêu người"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />
                 <Counter 
                title="Seats"
                subtitle="Có bao nhiêu chỗ"
                value={seatCount}
                onChange={(value) => setSeatCount(value)}
                />
                
            </div>
        )
    }
    return(
        <Modal 
            isOpen = {searchModal.isOpen}
            onClose= {searchModal.onClose}
            onSubmit={onSubmit}
            title="Search"
            actionLable={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined: onBack}
            body={bodyContent}
        />
    );
}



export default SearchModal