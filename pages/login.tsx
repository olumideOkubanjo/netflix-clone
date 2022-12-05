import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const [login, setlogin] = useState<boolean | null>(false);
    const { signIn, signUp } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            await signIn(email, password);
        } else {
            await signUp(email, password);
        }
    };

    return (
        <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
            <Head>
                <title>Netflix</title>
                <link
                    rel='stylesheet'
                    href='/favicon'
                />
            </Head>

            {/* Netflix Background image */}
            <Image
                src='https://rb.gy/p2hphi'
                layout='fill'
                className='-z-10 !hidden opacity-60 sm:!inline'
                objectFit='cover'
                alt=''
            />

            {/* Netflix logo image */}
            <img
                src='https://rb.gy/ulxxee'
                className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
                width={150}
                height={150}
            />

            <form
                className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-4xl font-semibold'>Sign In</h1>
                <div className='space-y-4'>
                    <label className='inline-block w-full'>
                        <input
                            type='email'
                            placeholder='Email'
                            className={`input ${
                                // Errors do not just show up until after you fill the form incorectly
                                errors.email && 'border-b-2 border-orange-500'
                            }`}
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className='p-1 text-[13px] font-light  text-orange-500'>
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className='inline-block w-full'>
                        <input
                            type='password'
                            placeholder='Password'
                            className={`input ${
                                errors.password &&
                                'border-b-2 border-orange-500'
                            }`}
                            {...register('password', { required: true })}
                        />
                        {errors.password && (
                            <p className='p-1 text-[13px] font-light  text-orange-500'>
                                Your password must contain between 4 and 60
                                characters.
                            </p>
                        )}
                    </label>
                </div>

                <button
                    className='w-full rounded bg-[#E50914] py-3 font-semibold'
                    onClick={() => {
                        setlogin(true);
                    }}>
                    Sign In
                </button>

                <div className='text-[gray]'>
                    New to Netflix?{' '}
                    <button
                        type='submit'
                        className='cursor-pointer text-white hover:underline'
                        onClick={() => {
                            setlogin(false);
                        }}>
                        Sign up now!
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;