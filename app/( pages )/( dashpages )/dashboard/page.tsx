'use client'
import React, { useState, useEffect } from 'react';
import LoggedInGuard from "@/app/( verification hook )/loggedinguard"
import {auth} from '../../../( firebase )/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { db } from '@/app/( firebase )/firebase';
import {useRouter} from 'next/navigation';
import Cardfichas from '@/app/components/cardfichasmenor';
import Bread from '../../../assets/bread.png'
import Meat from '../../../assets/carne.png'
import Soup from '../../../assets/sopa.png'
import Voltar from '../../../assets/back.png'
import Image from 'next/image'
import Logo from '../../../assets/logo.png'
import Footer from '@/app/components/footer';
export default function Dashboard(){
  const [desjejum, setDesjejum] = useState(0);
  const [almoco, setAlmoco] = useState(0);
  const [jantar, setJantar] = useState(0);
  
  const router = useRouter()

  const handleLogout = async () => {
    const auth = getAuth();
        const confirm = window.confirm("Are you sure you want to log out?");
        if (confirm) {
            signOut(auth).then(() => {
                // Sign-out successful.
                router.push('/')
                
                }).catch((error) => {
                // An error happened.1
                alert('Não foi possível deslogar!')
                });

        }

  };
  useEffect(() => {
    const getUserData = async () => {
      const user = onAuthStateChanged(getAuth(), async (user) => {
          // Do something with the user
          if (user) {
            const uid = user.uid
              const userRef = collection(db, 'users');
              const currentUserRef = doc(userRef, uid);
              const q = query(userRef, where('userid', '==', user.uid));
              const docs = await getDocs(q);
              const userData = docs.docs[0].data();
              setDesjejum(userData.refeicoes.desjejum);
              setAlmoco(userData.refeicoes.almoco);
              setJantar(userData.refeicoes.jantar);
          }
      });
    };

    getUserData();

    const interval = setInterval(() => {
      getUserData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return(
    <LoggedInGuard>
    <div className="back-greencolor flex flex-col justify-center">
      <nav className='flex justify-between p-7 items-center w-[80%] self-center'>
        <Link href='/'><Image src={Logo} alt='Logo'/></Link>
      <button className="bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339] flex text-white items-center gap-1 font-semibold py-2 px-5 rounded-tl-2xl rounded-br-2xl text-xl self-center " onClick={() => handleLogout()}><Image src={Voltar} alt="voltar" className="w-7"/><p>Logout</p></button>
      </nav>
      <section className='flex justify-center items-center flex-wrap gap-10 mt-20'>
      <div className="flex border-verdeescuro gap-5 p-12 border-2 rounded-xl">
      <Cardfichas image={Bread} text="Desjejum" number={desjejum}/>
      <Cardfichas image={Meat} text="Almoço" number={almoco}/>
      <Cardfichas image={Soup} text="Jantar" number={jantar}/>
      </div>
      <h1 className="text-left text-verdeescuro font-bold text-4xl">Bem Vindo(a),<br/> <span className="">{auth.currentUser?.displayName}</span></h1>
      </section>
      <section className='flex justify-between mt-[150px] back-greencolor'>
        <div className="w-[100vh] bg-white flex justify-center items-center text-verdeescuro flex-col">
          <p className='font-bold text-3xl'>Compre suas Fichas</p>
          <p className='w-[250px] text-lg mt-5'>Compre suas fichas do RU agora mesmo! Tenha suas fichas sem filas! Aproveite o RU com o nosso site!</p>
          <Link href='/venda' className='mt-10 group'><button className='bg-transparent text-verdeescuro font-bold text-2xl p-5 border-2 border-verdeescuro px-10 rounded-tl-2xl rounded-br-2xl hover:bg-verdeescuro hover:text-white duration-200 ease-in-out'>Comprar</button></Link>
        </div>
        <div className="w-[100vh] bg-[#4B6858] h-screen rounded-tl-[90px] rounded-bl-[90px] overflow-hidden flex justify-center max-sm:hidden background-mark4">
        </div>
      </section>
      <section className='flex justify-between mt-[150px] back-greencolor'>
      <div className="w-[100vh] bg-[#4B6858] h-screen rounded-tr-[90px] rounded-br-[90px] overflow-hidden flex justify-center max-sm:hidden background-mark3">
        </div>
        <div className="w-[100vh] bg-white flex justify-center items-center text-verdeescuro flex-col">
          <p className='font-bold text-3xl'>Veja o cardápio do dia</p>
          <p className='w-[250px] text-lg mt-5'>Você pode acompanhar o cardápio do restaurante universitário para manter-se atualizado!</p>
          <Link href='/cardapio' className='mt-10 group'><button className='bg-transparent text-verdeescuro font-bold text-2xl p-5 border-2 border-verdeescuro px-10 rounded-tl-2xl rounded-br-2xl hover:bg-verdeescuro hover:text-white duration-200 ease-in-out'>Cardápio</button></Link>
        </div>
        
      </section>
      <Footer/>
    </div>
    </LoggedInGuard>
  )
}