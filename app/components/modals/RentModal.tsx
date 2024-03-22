'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { useMemo, useState } from "react";
import CategoryInput from "../inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ProvinceSelect from "../inputs/ProvinceSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES =3,
    DESCRIPTION = 4,
    PRICE = 5,
}
const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    }=useForm<FieldValues>({
        defaultValues: {
            category : '',
            location: null,
            guestCount: 1,
            seatCount: 1,
            
            imageScr: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const seatCount = watch('seatCount');
   
    const imageScr = watch('imageScr');
    const setCustomValue = (id: string, value: any) => {
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
         
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () =>{
        setStep((value) => value + 1);
    };
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }


        setIsLoading(true);
        axios.post ('/api/cars', data)
        .then(() => {
            toast.success('Thêm thành công');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose()
        })
        .catch(() =>{
            toast.error('Hỏnggg!!!!');
        }).finally(() =>{
            setIsLoading(false);
        })
    }
    const actionLable = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Tạo'
        }
        return 'Tiếp'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return 'Trở lại'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6">
            <Heading 
                title = "Xe bạn phù hợp với loại hình nào???"
                subtitle = "Chọn một phân loại!"
            />
            <div className="grid grid-cols1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                        onClick={(category) => setCustomValue('category', category)}
                        selected = {category ===item.label}
                        label = {item.label}
                        icon = {item.icon}
                        />
                    </div>

                ))}
            </div>
        </div>
    )

    if(step ===STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-6">
            <Heading 
                title="Cơ sở của bạn ở đâu???"
                subtitle="Điều này sẽ giúp khách hàng dễ dàng thuê xe"
            />
            <ProvinceSelect value={location}
            onChange={(value) => setCustomValue('location', value)} />
            </div>
        )
    }
    if(step === STEPS.INFO){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading
                    title="Hãy chia sẻ một chút về xe"
                    subtitle="Xe có những gì"
                />
                <Counter
                 title="Seats"
                 subtitle="Có bao nhiêu ghế?"
                 value={seatCount}
                 onChange={(value) => setCustomValue('seatCount', value)}
                />
                <Counter
                 title="Guests"
                 subtitle="Bao nhiêu khách có thể ngồi vừa?"
                 value={guestCount}
                 onChange={(value) => setCustomValue('guestCount', value)}
                />
                

             </div>
         )
     }

    if(step === STEPS.IMAGES){
        bodyContent = (
         <div className="flex flex-col gap-7">
            <Heading 
                title="Thêm ảnh xe nào!!!"
                subtitle="Thêm ảnh"
            />
            <ImageUpload 
                value={imageScr}
                onChange={(value) => setCustomValue('imageScr', value)}
            />
         </div>
        )
    }
    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading 
                    title="Miêu tả xe của bạn "
                    subtitle="Càng ngắn càng tốt"
                />
                <Input
                    id= "title"
                    label="Mã"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id= "description"
                    label="Miêu tả"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if(step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-7">
                <Heading 
                    title="Định giá xe"
                    subtitle="Bạn muốn định giá bao nhiêu một ngày"
                />
                <Input 
                id="price"
                label="Giá"
                formatPrice 
                type="number"
                disabled= {isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }
    return( 
        <Modal 
        isOpen= {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLable={actionLable}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack}
         title="Gocar 4everywhere"
         body={bodyContent}
        />
    );
}
export default RentModal;