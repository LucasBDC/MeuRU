'use client'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../../../( firebase )/firebase"; // import your firebase config file
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Voltar from '@/app/assets/back.png'
function MyApp({ Component, pageProps } : any) {
    const [desjejum, setDesjejum] = useState('')
    const [almoco, setAlmoco] = useState('') 
    const [jantar, setJantar] = useState('') 
  
    useEffect(() => {
      async function handleLoader(){
        const userRef = collection(db, 'cardapio');
        const currentUserRef = doc(userRef, 'MFOBdXl1uaNx5ITrZuNn');
        const q = query(userRef, where('idcard', '==', 'MFOBdXl1uaNx5ITrZuNn'));
        const docs = await getDocs(q);
        const userData = docs.docs[0].data();
        setDesjejum(userData.Desjejum)
        setAlmoco(userData.Almoço)
        setJantar(userData.Jantar)
        
      }
      setTimeout(handleLoader, 1000)
    }, [])
  return (
    <div className="back-greencolor h-screen p-4">
      <nav><Link href='/dashboard'><button className="bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339] flex text-white items-center gap-1 font-semibold py-2 px-5 rounded-tl-2xl rounded-br-2xl text-xl self-start "><Image src={Voltar} alt="voltar" className="w-7"/><p>Voltar</p></button></Link></nav>
      <div className="flex flex-col gap-5 justify-center items-center h-[100%] ">
        
      <h1 className="text-verdeescuro text-center mb-5 font-bold text-3xl">Cardápio</h1>
        <p className="border-verdeescuro border-2 resize-none w-[80%] rounded-xl p-3 bg-transparent text-black">{desjejum}</p>
      <p className="text-black border-verdeescuro border-2 resize-none w-[80%] rounded-xl p-3 bg-transparent">{almoco}</p>
      <p className="text-black border-verdeescuro border-2 resize-none w-[80%] rounded-xl p-3 bg-transparent">{jantar}</p></div>
    </div>
  );
}

export default MyApp;