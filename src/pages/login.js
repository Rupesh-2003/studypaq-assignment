import { useAuth } from "@/context/AuthContext"
import axios from "axios"
import { Button } from "flowbite-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"
import { toast } from "react-toastify"

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { isLoggedIn, setIsLoggedIn } = useAuth()

    const onLoginClickHanlder = (e) => {
        setLoading(true)
        e.preventDefault()

        const data = JSON.stringify({
            "email": email,
            "password": password
        });
          
        var config = {
            method: 'post',
            url: `${process.env.BACKEND_URL}/login`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            sessionStorage.setItem('token', response.data.token)
            setEmail('')
            setPassword('')
            toast.success("Login successful", { autoClose: 1500 })
            setIsLoggedIn(true)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error);
            toast.error(error.response.data.message, { autoClose: 1500 })
            setEmail('')
            setPassword('')
            setIsLoggedIn(false)
            setLoading(false)
        });
    }

    useEffect(() => {
        if(isLoggedIn) {
            router.push("/home")
        }
    }, [isLoggedIn])

    return (
        <div className="flex min-h-[calc(100vh-160px)] h-auto font-inter">
            <div className="flex flex-col gap-y-[30px] items-center justify-center w-[40%] sm:w-[90%] h-auto py-[30px] box-border m-auto border-[1px] rounded-md">

                <h1 className="text-[32px]">Welome Back!</h1>

                <form action="" className="flex flex-col gap-y-[30px] justify-center items-center w-[60%] sm:w-[70%]" onSubmit={onLoginClickHanlder}>
                    <div className="w-[100%]">
                        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            </div>
                            <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="name@gmail.com" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-[100%]">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {!loading 
                    ? 
                        <Button className="w-[30%] sm:w-[50%]" type="submit">Login</Button>
                    :
                        <div className="w-[30%] sm:w-[50%] flex justify-center items-center">
                            <ScaleLoader color="#3670FF"/>
                        </div>
                    }
                </form>
                
                <div className="flex flex-col w-full px-[30px] text-[14px] border-t-[1px] pt-[20px] box-border">
                    <div>Test Credentials:</div>
                    <div>email: test@test.com</div>
                    <div>password: test123</div>
                </div>
                
            </div>
        </div>
    )
}

export default Login