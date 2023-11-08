'use client'
import React, { useState, useEffect } from "react"
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db, auth } from '@/app/( firebase )/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { error } from "console";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Voltar from '../../../assets/back.png'
export interface prod{
  soma: Number,
  desjejumScreen: Number,
  almoçoScreen: Number,
  jantarScreen: Number,
}
export default function Venda() {
  const [desjejumScreen, setDesjejumScreen] = useState(0)
  const [almocoScreen, setAlmocoScreen] = useState(0)
  const [jantarScreen, setJantarScreen] = useState(0)
  const [soma, setSoma] = useState(0.0)
  let precio;
  let cantidad;
  let nombre;
  const producto = [{"nome" : 'Refeição RU', "preco" : soma, "quantidade" : 1}]


  const FuncionComprar = async (producto: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/Mercado_Pago",
        {...producto[0], desjejumScreen, almocoScreen, jantarScreen, soma}
      );
      response.data.status === "approved"
      window.location.href = response.data;
        
      
    } catch (error:any) {
      alert(error.message)
    }
  };

  const handleIncrease = (meal: string) => {
    switch (meal) {
      case "desjejum":
        setDesjejumScreen(desjejumScreen + 1)
        break
      case "almoco":
        setAlmocoScreen(almocoScreen + 1)
        break
      case "jantar":
        setJantarScreen(jantarScreen + 1)
        break
      default:
        break
    }
  }

  const handleDecrease = (meal: string) => {
    switch (meal) {
      case "desjejum":
        if (desjejumScreen > 0) {
          setDesjejumScreen(desjejumScreen - 1)
        }
        break
      case "almoco":
        if (almocoScreen > 0) {
          setAlmocoScreen(almocoScreen - 1)
        }
        break
      case "jantar":
        if (jantarScreen > 0) {
          setJantarScreen(jantarScreen - 1)
        }
        break
      default:
        break
    }
  }


  useEffect(() => {
    setSoma((desjejumScreen * 0.65) + (almocoScreen * 1.5) + (jantarScreen * 1.5))
  }, [desjejumScreen, almocoScreen, jantarScreen])

  return (
    <div className="flex flex-col h-screen items-center justify-around text-black">
      <Link href='/dashboard'><button className="bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339] flex text-white items-center gap-1 font-semibold py-2 px-5 rounded-tl-2xl rounded-br-2xl text-xl self-start "><Image src={Voltar} alt="voltar" className="w-7"/><p>Voltar</p></button></Link>
      <div className="flex flex-col gap-2">
      <div className="flex w-[300px] justify-between">
        <p>Desjejum</p>
        <div className="flex ">
        <button onClick={() => handleDecrease("desjejum")} className="bg-red-500 text-white font-black p-2 rounded-l-2xl">-</button>
        <p className="p-2 w-10 text-center">{desjejumScreen}</p>
        <button onClick={() => handleIncrease("desjejum")} className="bg-green-500 text-white font-black p-2 rounded-r-2xl">+</button>
        </div>
      </div>
      <div className="flex w-[300px] justify-between">
        <p>Almoco</p>
        <div className="flex">
        <button className="bg-red-500 text-white font-black p-2 rounded-l-2xl" onClick={() => handleDecrease("almoco")}>-</button>
        <p className="p-2 w-10 text-center">{almocoScreen}</p>
        <button className="bg-green-500 text-white font-black p-2 rounded-r-2xl" onClick={() => handleIncrease("almoco")}>+</button>
        </div>
      </div>
      <div className="flex w-[300px] justify-between">
        <p>Jantar</p>
        <div className="flex">
        <button className="bg-red-500 text-white font-black p-2 rounded-l-2xl" onClick={() => handleDecrease("jantar")}>-</button>
        <p className="p-2 w-10 text-center">{jantarScreen}</p>
        <button className="bg-green-500 text-white font-black p-2 rounded-r-2xl" onClick={() => handleIncrease("jantar")}>+</button>
        </div>
      </div>
      </div>
      <div className="flex justify-center flex-col"><p className="self-center w-32 border-verdeescuro border-2 text-center p-2 rounded-lg mt-10">R${soma}</p>
      <button onClick={() => FuncionComprar(producto)} className='bg-transparent text-verdeescuro font-bold text-2xl p-3 border-2 border-verdeescuro px-16 mt-10 rounded-tl-2xl rounded-br-2xl hover:bg-verdeescuro hover:text-white duration-200 ease-in-out' >Pagar</button></div>
      </div>
      
  )}