import { ScaleLoader } from 'react-spinners'
const Loader = () => {
    
    return (
        <div className={`h-[calc(100vh-160px)] w-full flex flex-col justify-center items-center box-border font-inter`}>
            <ScaleLoader color="#3670FF"/>
            <div className="mt-[20px]">Loading...</div>
        </div>
    )
}

export default Loader