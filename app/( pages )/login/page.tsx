'use client'
import Image from "next/image"
import Link from "next/link"
import {auth, provider} from '@/app/( firebase )/firebase'


import Mark from "@/app/assets/mark2.png"
import Voltar from '../../assets/back.png'
import Google from '../../assets/google.png'

import StyledInput from "@/app/components/styledinput"
import AuthButton from "@/app/components/authbuttons"
import ImageButton from "@/app/components/imagebutton"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Login(){
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

   function handleSignIn() {
  // Function to handle sign in
     signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      router.push('/dashboard')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message)
    });
  }
    return(
        <main className="flex justify-between">
            <div className="w-[100vh] bg-white flex justify-center items-center">
                <div className="w-[70%] h-screen justify-center flex flex-col gap-1">
                <Link href='/'><button className="bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339] flex text-white items-center gap-1 font-semibold py-2 px-5 rounded-tl-2xl rounded-br-2xl text-xl self-start "><Image src={Voltar} alt="voltar" className="w-7"/><p>Voltar</p></button></Link>
                    <h2 className="text-black text-[4rem] font-extrabold text-center mt-10">Login</h2>
                    <StyledInput type='email' placeholder='example@gmail.com' name='email' value={email} label='email' texto='E-mail' onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}/>
                    <StyledInput type='password' placeholder='*******' value={password} name='password' label='password' texto='Senha' onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}/>
                    <Link href='/'><p className="text-gray-400 text-right hover:text-gray-700 duration-100">Esqueceu sua Senha?</p></Link>
                    <div className="flex flex-col w-[100%] gap-2 justify-between mt-3">
                        <div className="w-[100%]">
                        <AuthButton value='ENTRAR' onClick={() => handleSignIn()}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100vh] bg-[#4B6858] h-screen rounded-tl-[250px] rounded-bl-[250px] overflow-hidden flex justify-center max-sm:hidden background-mark1">

            </div>
        </main>
    )
}