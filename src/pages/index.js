import { useAuth } from '@/context/AuthContext'
import { Button } from 'flowbite-react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const { isLoggedIn } = useAuth()

  return (
    <>
      <Head>
        <title>Studypaq assignment</title>
        <meta name="description" content="website to fetch images from flask api and display on the screen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col items-center'>
        <div className="mt-[60px] mb-[40px] text-center text-[48px] font-medium bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent ">
          Studypaq Assignment
        </div>

        {!isLoggedIn
        ? 
          <>
            <div>Please login to use the platform</div>
            <div className='text-[#838383] mt-[30px] text-center'>Added login functionality to implement jwt token to secure our apis</div>
            <Button className="sm:w-[200px] w-[200px] mt-[50px]" onClick={() => {router.push('/login')}}>Login</Button>
          </>
        :
          <>
            <div>Your are loggedIn, you can visit home page</div>
            <div className='text-[#838383] mt-[30px] text-center'>Added login functionality to implement jwt token to secure our apis</div>
            <Button className="sm:w-[200px] w-[200px] mt-[50px]" onClick={() => {router.push('/home')}}>
              Go to Main Page
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-[5px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </>
        }
      </div>
    </>
  )
}
