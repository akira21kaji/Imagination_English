'use client'

import firebaseServices from '@/src/lib/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Span } from 'next/dist/trace';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginProps = {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    console.log(data)
    await signInWithEmailAndPassword(firebaseServices.auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user;
        router.push('/list');
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
            <h1 className='text-2xl font-bold text-center text-white'>Login</h1>
            <div>
              <input 
                {...register('email',{
                  required: 'メールアドレスは必須です。',
                  pattern: {
                    value: 
                      /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    message: '不適切なメールアドレスです。',
                  }
                })}
                type="text" 
                placeholder='Email' 
                className='bg-transparent border-b border-white p-1 mt-1 mb-2 text-white w-full'/>
                {errors.email && <span className='text-red-600 text-sm'>{errors.email.message}</span>}
            </div>
            <div>
              <input 
                {...register('password',{
                  required: 'パスワードは必須です。',
                  minLength: {
                    value: 8,
                    message: 'パスワードは6文字以上です。',
                  }
                })}
                type="password" 
                placeholder='Password' 
                className='bg-transparent border-b border-white p-1 mb-2 text-white w-full'/>
                {errors.password && <span className='text-red-600 text-sm'>{errors.password.message}</span>}
            </div>
            <button 
              className='bg-neutral-600 py-1 px-4 mt-2 rounded text-white justify-center mb-2 text-sm hover:bg-neutral-500'
              >
              Login
            </button>
            <p className='text-gray-400 text-sm text-center'>or</p>
            <button 
              className='bg-neutral-600 py-1 px-4 mt-2 rounded text-white justify-center mb-2 text-sm hover:bg-neutral-500'
              >
              Google Login
            </button>
            <div className='text-white text-sm'>
              アカウントをお持ちでない方は
              <Link 
                href={'/signup'} 
                className='text-blue-500 underline underline-offset-2 hover:text-blue-400'
                >
              新規登録ページへ
            </Link>
            </div>
          </form>
      </div>
      </div>
  )
}

export default Login;