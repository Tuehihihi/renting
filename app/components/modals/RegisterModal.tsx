'use client';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
const RegisterModal = () =>{
    const  registerModal = useRegisterModal();

  const [ isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() =>{
      
        registerModal.onClose();
        
    })
    .catch((error) =>{
        toast.error('Ko ổn rồi!!!');
    })
    .finally(()=>{
        setIsLoading(false);
    })
  }
  const bodyContent =(
    <div className='flex flex-col gap-4'>
        <Heading  
        title="Chào mừng bạn đến với GoCar"
        subtitle="Tạo tài khoản"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="phoneNumber" label="Phone Number" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required/>
    </div>
  );
  const footerContent =(
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
       outline
       label="Continue with google"
       icon={FcGoogle}
       onClick={()=>{}}
      />
      <Button 
       outline
       label="Continue with Github"
       icon={AiFillGithub}
       onClick={()=>signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Đã có tài khoản rồi?
          </div>
          <div onClick={registerModal.onClose}
          className='text-neutral-800 cursor-pointer hover:underline' > 
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  )
    return(
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Đăng kí"
        actionLable="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
} 
export default RegisterModal;