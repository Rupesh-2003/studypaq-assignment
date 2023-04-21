import Navbar from "./navbar"
import Footer from "./footer"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"

const Layout = ({ children }) => {
    const { setIsLoggedIn } = useAuth()

    const checkIfLoggedIn = () => {
        var config = {
            method: 'POST',
            url: `${process.env.BACKEND_URL}/isLoggedIn`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
        
        axios(config)
        .then(function (response) {
            setIsLoggedIn(true)
        })
        .catch(function (error) {
            console.log(error.response.data.message);
            setIsLoggedIn(false)
        });
    }

    useEffect(() => {
        checkIfLoggedIn()
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col pt-[60px] min-h-[calc(100vh-100px)]">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout