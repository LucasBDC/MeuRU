import Link from "next/link"
import Image from "next/image"
import LogoBranco from '../assets/logo_branca.png'
export default function Footer(){
    return(
        <footer className='h-[15rem] bg-verdeescuro flex justify-around items-center'>
      <Link href='/'>
            <Image src={LogoBranco} alt='Logo' className='w-[250px]'/>
          </Link>
        <p className='text-white'>Copyright © 2023 BlockShare<br/>
Todos os direitos reservados</p>
      </footer>
    )
}