import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter()
    const { isLoggedIn, setIsLoggedIn } = useAuth()

    const onLoginHandler = () => {
        router.push('/login')
    }

    const onLogoutHandler = () => {
        sessionStorage.setItem('token', '')
        setIsLoggedIn(false)
    }

    return (
        <div className={`fixed w-full h-[60px] flex flex-row items-center border-b-[1px] px-[65px] font-inter z-50 bg-white
            sm:px-[30px]
        `}>
            <div 
                className={`flex flex-row items-center gap-x-[15px] text-[22px] cursor-pointer sm:text-[18px]`}
                onClick={() => {router.push('/')}}
            >
                <img src="/favicon.ico" alt="logo" className="w-[20px] h-[20px] sm:w-[15px] sm:h-[15px]"/>
                <span>Images</span>
            </div>

            <div className={`flex flex-row gap-x-[40px] ml-auto text-[14px] sm:text-[12px]`}>
                <button 
                    className={`flex flex-row items-center gap-x-[6px] px-[20px] py-[8px] rounded-2xl text-[#eoeb3d] font-medium bg-[#F5F9FC]
                    sm:px-[10px] sm:py-[6px]
                    `}
                    onClick={isLoggedIn ? onLogoutHandler : onLoginHandler}
                >
                    {isLoggedIn ? "Logout" : "Login"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Navbar