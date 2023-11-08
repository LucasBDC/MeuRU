'use client'

import Image from "next/image"
import Link from "next/link"
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth"
import {app, auth} from '@/app/( firebase )/firebase'
import {db} from '@/app/( firebase )/firebase'

import Mark from "@/app/assets/mark3.png"
import Voltar from '../../assets/back.png'
import Google from '../../assets/google.png'

import StyledInput from "@/app/components/styledinput"
import AuthButton from "@/app/components/authbuttons"
import ImageButton from "@/app/components/imagebutton"
import { SetStateAction, useState } from "react"
import {useRouter} from "next/navigation"
import { collection, doc, setDoc } from "firebase/firestore"

interface User {
  displayName: string;
  cpf: string;
}

const FIREBASE_AUTH = getAuth();


export default function Registro(){
  const router =  useRouter()
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [matricula, setMatricula] = useState('');
  
  const usersCollectionRef = collection(db, 'users');

  async function handleSignUp() {
    if (typeof window !== 'undefined') {
      // Create a new user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Get the authenticated user
      const user = userCredential.user;
  
      // Update the user's profile
      await updateProfile(user, { displayName: name });
  
      // Create a new document in the 'users' collection with user data
      const userDocRef = doc(usersCollectionRef, user.uid);
  
      const userData = {
        userid: user.uid,
        displayName: name,
        cpf: cpf,
        matricula: matricula,
        email: email,
        password: password,
        refeicoes:{
          desjejum: 0,
          almoco: 0,
          jantar: 0
        }
      };
  
      try {
        await setDoc(userDocRef, userData);
        console.log('User data saved to Firestore.');
  
        // Clear the sign up form
        setEmail('');
        setPassword('');
        setName('');
        setCPF('');
        setMatricula('');
  
        // Display an alert message to the user
        alert('Sign up successful!');
        router.push('/login');
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    } else {
      // Display an error message to the user
      alert('Sign up failed');
    }
  }
  

    

    return(
        <main className="flex w-screen flex-wrap justify-between max-lg:justify-center items-center">
            <div className="w-[70vh] bg-white flex justify-center items-center self-center ml-32 max-xl:ml-0">
                <div className="w-[60%] h-screen justify-center flex flex-col gap-1 self-center">
                <Link href='/'><button className="bg-[#4B6858] hover:bg-[#618672] duration-100 active:bg-[#314339] flex text-white items-center gap-1 font-semibold py-2 px-5 rounded-tl-2xl rounded-br-2xl text-xl self-start "><Image src={Voltar} alt="voltar" className="w-7"/><p>Voltar</p></button></Link>
                    <form onSubmit={handleSignUp} method="POST">
                        <h2 className="text-black text-[4rem] font-extrabold text-center mt-10 max-md:text-[3rem]">Registrar</h2>
                        <StyledInput type='email' placeholder='example@gmail.com' name='email' label='email' texto='E-mail' value={email} onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                           setEmail(e.target.value as string);
                        }}/>
                        <StyledInput type='password' placeholder='*******' name='password' label='password' texto='Senha' value={password} onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                           setPassword(e.target.value as string);
                        }}/>
                        <StyledInput type='text' placeholder='Joe Doe' name='name' label='name' texto='Nome' value={name} onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                          setName(e.target.value as string);
                        }}/>
                        <StyledInput type='text' placeholder='000.000.000-00' name='cpf' label='cpf' texto='CPF' value={cpf} onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                          setCPF(e.target.value as string);
                        }}/>
                        <StyledInput type='text' placeholder='Matrícula' name='matricula' label='matricula' texto='Matrícula' value={matricula} onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                          setMatricula(e.target.value as string);
                        }}/>
                        <Link href='/'><p className="text-gray-400 text-right hover:text-gray-700 duration-100 mt-1">Esqueceu sua Senha?</p></Link>
                        <AuthButton value='CADASTRAR'/>
                    </form>
                </div>
            </div>
            <div className="w-[100vh] bg-[#4B6858] h-screen rounded-tl-[250px] rounded-bl-[250px] overflow-hidden flex justify-center max-lg:hidden max-2xl:w-[43.5%] background-mark3">

            </div>
        </main>
    )
}