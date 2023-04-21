import { useAuth } from "@/context/AuthContext"
import Loader from "../components/loader"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"

const Home = () => {
    const router = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [atBottom, setAtBottom] = useState(false)
    const [after, setAfter] = useState('')

    const { isLoggedIn } = useAuth()

    const fetchData = async ()  => {
        setLoading(true)
        // const data = await axios.get("https://www.reddit.com/r/images/new.json?limit=30")

        var config = {
            method: 'GET',
            url: `${process.env.BACKEND_URL}/getData`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
        
        axios(config)
        .then(function (response) {
            setData(response.data.data)
            setAfter(response.data.after)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error.response);
            setLoading(false)
        });
    }

    const fetchNextData = (limit=30) => {
        var config = {
            method: 'GET',
            url: `${process.env.BACKEND_URL}/getData?limit=${limit}&after=${after}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
        
        axios(config)
        .then(function (response) {
            setData((prev) => ([...prev, ...response.data.data]))
            setAfter(response.data.after)
            setAtBottom(false)
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if(bottom && atBottom != true) {
            setAtBottom(true)
        }
    };

    useEffect(() => {
        if(!isLoggedIn) {
            router.push("/login")
        }
        else {
            fetchData()
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
      
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isLoggedIn])

    useEffect(() => {
        if(atBottom)
            fetchNextData()
    }, [atBottom])

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className="py-[20px]">
            <div id="container" className="flex flex-row flex-wrap w-[80%] mx-auto gap-x-[5%] gap-y-[5vh]">
                {data.map((data, index) => {
                    return (
                        <div className="flex flex-col w-[30%] h-[250px] border-[1px] rounded-md overflow-hidden box-border sm:w-[100%]" key={index}>
                            <img src={data.url} className="w-[100%] h-[180px] object-cover"/>
                            <div className="flex flex-col justify-center px-[10px] py-[5px] gap-x-[20px] bg-[#F6F9FC] w-full h-[calc(250px-180px)]">
                                <div className="text-[16px] font-medium truncate">Title: {data.title}</div>
                                <div className="text-[13px]">Author: {data.author}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {atBottom && <div className="flex justify-center items-center w-full h-[200px]">
                <ScaleLoader color="#3670FF"/>
            </div>}
        </div>
    )
}

export default Home