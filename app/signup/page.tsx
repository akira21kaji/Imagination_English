'use client'

import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'yup';
import { schema } from '@/src/lib/auth/validation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import firebaseServices from '@/src/lib/firebase/firebase';
import { SubmitHandler, useForm } from 'react-hook-form';

type AuthProps = yup.InferType<typeof schema>;

const SignUp: React.FC = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: {errors} } = useForm<AuthProps>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
    await createUserWithEmailAndPassword(firebaseServices.auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user;
        router.push('/login');
      })
      .catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col gap-10 bg-slate-100 w-2/5 float-left justify-center items-center'>
        <h1 className='text-6xl font-bold text-center text-gray-800'>
          ENGLISH <br/>
          with <br/>
          IMAGINE
        </h1>
        <p className='text-neutral-400 text-center text-xl text-balance'>
        This service is support your learning English with generated images.
        You can learn English with images and get more fun.
        </p>
      </div>
      <div className='flex flex-col w-3/5 float-right justify-center items-center'>
          <form 
            className='flex flex-col bg-neutral-700 p-8 rounded-lg shadow-md w-2/5 gap-2'
            onSubmit={handleSubmit(onSubmit)}
            >
            <h1 className='text-2xl font-bold text-center text-white'>SignUp</h1>
            <div>
            <input 
                {...register('email')}
                type="text" 
                placeholder='Email' 
                className='bg-transparent border-b border-white p-1 mt-1 mb-2 text-white w-full'/>
                <span className='text-red-600 text-sm'>{errors.email?.message}</span>
            </div>
            <div>
            <input 
                {...register('password')}
                type="password" 
                placeholder='Password' 
                className='bg-transparent border-b border-white p-1 mb-2 text-white w-full'/>
                <span className='text-red-600 text-sm'>{errors.password?.message}</span>
            </div>
            <button 
              className='bg-neutral-600 py-1 px-4 mt-2 rounded text-white justify-center mb-2 text-sm hover:bg-neutral-500'
              >
              SignUp
            </button>
            <p className='text-gray-400 text-sm text-center'>or</p>
            <button 
              className='bg-neutral-600 py-1 px-4 mt-2 rounded text-white justify-center mb-2 text-sm hover:bg-neutral-500'
              >
              Google Account
            </button>
            <div className='text-white text-sm'>
              すでにアカウントをお持ちの方は
              <Link 
                href={'/login'} 
                className='text-blue-500 underline underline-offset-2 hover:text-blue-400'
                >
              ログインページへ
            </Link>
            </div>
          </form>
      </div>
      </div>
  )
}

export default SignUp;