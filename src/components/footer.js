const Footer = () => {
    return (
        <footer className={`
            flex flex-col gap-y-[10px] items-center justify-center border-t-[1px] h-[100px] px-[65px] font-inter text-[#535479] box-border bg-[#F6F9FC]
        `}>
            <div className={`text-[#0E0B3D] text-center`}>
                <span className="text-[#838383] text-[13px]">Built by </span> Rupesh Raut
            </div>
            <div className={`text-[#838383] text-center text-[14px]`}>
                website built as an assignment for fullstack intern role at studypaq
            </div>
        </footer>
    )
}

export default Footer