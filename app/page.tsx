import Image from 'next/image'
import Link from 'next/link'

import Logo from './assets/logo.png'
import LogoBranco from './assets/logo_branca.png'
import SetaDir from './assets/right.png'
import Mark1 from './assets/mark1.png'
import Bread from './assets/bread.png'
import Meat from './assets/carne.png'
import Soup from './assets/sopa.png'
import Cardfichas from './components/cardfichas'
import Avatar from './assets/Ellipse 1.png'
import Footer from './components/footer'

export default function Home() {
  return (
    <main className='back-greencolor flex flex-col'>
      <header className=' w-[80%] self-center justify-center flex pt-5'>
        <nav className='flex justify-between w-screen'>
          <Link href='/' className='max-sm:hidden'>
            <Image src={Logo} alt='Logo' className='w-[250px]'/>
          </Link>
          <div className="flex items-center gap-7">
            <Link href='/login'><p className='text-black hover:text-gray-400 duration-75'>Login</p></Link>
            <Link href='/registro'><button className='text-verdesel border-2 border-verdesel   py-2 px-5 rounded-tr-xl rounded-bl-xl hover:bg-verdesel hover:text-white duration-200 ease-in-out'>Cadastrar</button></Link>
          </div>
        </nav>
      </header>
      <article className='flex w-screen flex-col justify-center items-center'>
      <div className="w-[80%] h-[28rem] bg-[#4B6858] rounded-3xl overflow-hidden drop-shadow-xl shadow-black flex justify-around flex-wrap mt-12  back-texture">
        <Image src={Mark1} alt='Mark' className='w-[500px] h-[400] pointer-events-none'/>
        <div className="flex flex-col h-[100%] justify-center">
          <Image src={LogoBranco} alt='logobranco' className='w-[25rem]'/>
          <p className='text-white w-80 text-lg'>Gerencie seu dia a dia no RU agora mesmo, é gratuito!<br/>Tome controle do seu dia a dia no RU com uma conta gratuita.</p>
          <Link href='/' className='flex justify-normal items-start group font-medium'><p className='text-white group-hover:font-semibold duration-100 '>Saiba Mais</p><Image src={SetaDir} alt='saibamais' className=' group-hover:translate-x-1 duration-100 ml-1'/></Link>
        </div>
      </div>
      </article>
      <hr className='border border-slate-800/50 mt-24 mx-80' />
      <section className='flex flex-col justify-center items-center tracking-tight mt-20 w-[80%] self-center'>
        <p className='font-extrabold uppercase text-[60px] text-black max-md:text-[40px]'>gerencie suas fichas no ru.</p>
        <div className="flex flex-wrap justify-around gap-20 mt-24">
          <Cardfichas image={Bread} alt="Desjejum" text="Desjejum" number='2'/>
          <Cardfichas image={Meat} alt="Almoço" text="Almoço" number='4'/>
          <Cardfichas image={Soup} alt="Jantar" text="Jantar" number='3'/>
        </div>
      </section>
      <hr className='border border-slate-800/50 mt-24 mx-80' />
      <section className='h-screen flex flex-col justify-center items-center mt-52 max-md:mt-[35rem]'>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex flex-col items-center bg-[#498C8A] w-[20rem] h-[30rem] rounded-xl p-7 justify-around">
              <div className="">
              <Image src={Avatar} alt='avatar' className='w-[150px]'/>
              <p className='text-white font-bold text-xl'>Dana Smitham</p>
              </div>
              <p className='text-white '>O aplicativo do RU é uma mão na roda! Antes, eu tinha que ficar esperando em filas enormes para comprar fichas, sem saber quanto de saldo ainda tinha. Agora, consigo comprar fichas de onde estiver, com apenas alguns toques na tela. É muito mais rápido e prático</p>
            </div>
            <div className="flex flex-col items-center bg-[#498C8A] w-[20rem] h-[30rem] rounded-xl p-7 justify-around">
              <div className="">
              <Image src={Avatar} alt='avatar' className='w-[150px]'/>
              <p className='text-white font-bold text-xl'>Dana Smitham</p>
              </div>
              <p className='text-white '>O aplicativo do RU é uma mão na roda! Antes, eu tinha que ficar esperando em filas enormes para comprar fichas, sem saber quanto de saldo ainda tinha. Agora, consigo comprar fichas de onde estiver, com apenas alguns toques na tela. É muito mais rápido e prático</p>
            </div>
            <div className="flex flex-col items-center bg-[#498C8A] w-[20rem] h-[30rem] rounded-xl p-7 justify-around">
              <div className="">
              <Image src={Avatar} alt='avatar' className='w-[150px]'/>
              <p className='text-white font-bold text-xl'>Dana Smitham</p>
              </div>
              <p className='text-white '>O aplicativo do RU é uma mão na roda! Antes, eu tinha que ficar esperando em filas enormes para comprar fichas, sem saber quanto de saldo ainda tinha. Agora, consigo comprar fichas de onde estiver, com apenas alguns toques na tela. É muito mais rápido e prático</p>
            </div>
          </div>
      </section>
      <Footer/>
    </main>
  )
}
