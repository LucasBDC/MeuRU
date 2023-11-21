'use client'
import React, { useState, useEffect } from "react"
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db, auth } from '@/app/( firebase )/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { error } from "console";
import Link from "next/link";
import Router from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import LoggedInGuard from "@/app/( verification hook )/loggedinguard";

export default function Success() {
  const searchparam = useSearchParams()
  let desjejum = searchparam.get('desjejum')
  let desjejumScreen = 0
  let almoco = searchparam.get('almoco')
  let almocoScreen = 0
  let jantarScreen = 0
  let jantar = searchparam.get('jantar')
  let status = searchparam.get('collection_status')
  if(desjejum){
    desjejumScreen = parseFloat(desjejum)
  }
  if(almoco){
    almocoScreen = parseFloat(almoco)
  }
  if(jantar){
    jantarScreen = parseFloat(jantar)
  }
  const soma = searchparam.get('soma')
  const router = useRouter()


 
  const handleIncreaseFirestore = async () => {
    const currentUser = auth.currentUser;
  
     if (currentUser) {
      const uid = currentUser.uid;
  
      const userRef = collection(db, "users");
      const currentUserRef = doc(userRef, uid);
  
      // Get the user document from Firestore using the uid.
      const currentUserDoc = await getDoc(currentUserRef);
      const user = onAuthStateChanged(getAuth(), async (user) => {
        // Do something with the user
        if (user) {
          const userRef = collection(db, 'users');
          const q = query(userRef, where('userid', '==', user.uid));
          const docs = await getDocs(q);
          const userData = docs.docs[0].data();
  
          const currentDesjejum = userData.refeicoes.desjejum
          const currentAlmoco = userData.refeicoes.almoco
          const currentJantar = userData.refeicoes.jantar
          const desjejum = desjejumScreen + currentDesjejum;
          const almoco = almocoScreen + currentAlmoco;
          const jantar = jantarScreen + currentJantar;
          await updateDoc(currentUserRef, {
            refeicoes:{
                desjejum,
                almoco,
                jantar,
            }
          });
  // Create a new document in the "tickets" collection.
  const ticketRef = collection(db, "ticketlog");
  const ticketDoc = doc(ticketRef);
  await setDoc(ticketDoc, {
    ticketId: ticketDoc.id,
    userId: user.uid,
    userCpf: userData.cpf,
    userMatricula: userData.matricula,
    refeicoes: {
      desjejumScreen,
      almocoScreen,
      jantarScreen,
    },
    soma: 'R$:'+soma,
  });
          
        }
      });
      alert('Fichas compradas com sucesso:\nDesjejum: '+desjejumScreen+'\nAlmoço: '+almocoScreen+'\nJantar: '+jantarScreen)
      router.push('/dashboard')
    } else {
      // The user is not logged in.
      alert('Usuário não está logado');
    }
  };
  useEffect(() => {
    if(status==="approved"){
        setTimeout(handleIncreaseFirestore, 1000);
    }
  }, []);


  return (
    <LoggedInGuard>
        <div className=""></div>
    </LoggedInGuard>
  )
}
