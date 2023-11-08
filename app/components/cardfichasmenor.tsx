import Image from "next/image"
export default function Cardfichasmenor(props: any){
    return(
        <div className="w-[8rem] bg-verdeescuro h-[10rem] rounded-3xl overflow-visible flex flex-col items-center p-5 justify-end">
              <Image src={props.image} alt={props.alt} className='relative w-[4rem] left-[70px] pointer-events-none top-[5rem]'/>
              <span className='text-white text-[5rem] font-bold leading-tight mt-16'>{props.number}</span>
              <p className='text-white text-2xl font-bold'>{props.text}</p>
          </div>
    )
}