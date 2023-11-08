import Image from "next/image"

export default function ImageButton(props : any, onClick : any){
    return(
        <div className="flex">
            <button onClick={props.onClick} className="bg-slate-100 shadow-xl px-4 py-2 group flex gap-4 items-center w-[100%] justify-center" ><p className="text-black text-lg font-medium ">Entre com Google</p><Image src={props.image} alt={props.alt} className="active:opacity-50 duration-200 w-10"/></button>
        </div>
    )
}