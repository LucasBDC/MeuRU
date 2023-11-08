import Image from "next/image"
export default function Cardfichas(props: any){
    return(
        <div className="w-[19rem] max-md:w-[15rem] bg-verdeescuro h-[20rem] rounded-3xl overflow-visible flex flex-col items-center p-5">
              <Image src={props.image} alt={props.alt} className='relative max-md:left-[100px] left-[140px] top-[-50px] mb-[-150px] pointer-events-none'/>
              <span className='text-white text-[12rem] font-bold leading-tight mt-8'>{props.number}</span>
              <p className='text-white text-4xl font-bold mb-10'>{props.text}</p>
          </div>
    )
}