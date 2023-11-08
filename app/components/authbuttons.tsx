export default function AuthButton(props : any, onClick : any){
    return(
        <div className="w-[100%]">
            <input type="submit" onClick={props.onClick} value={props.value} className="text-white font-bold bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339]  text-[2.5rem] cursor-pointer rounded-tl-3xl rounded-br-3xl py-1 text-center w-full px-5 max-md:text-[1.5rem] max-md:py-3 "/>
        </div>
    )
}