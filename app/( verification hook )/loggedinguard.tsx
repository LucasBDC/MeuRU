'use client'
// Import dependencies
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/( firebase )/firebase";

// Function component
export default function LoggedInGuard({ children }: { children: React.ReactNode }): React.ReactElement {
  // Router
  const router = useRouter();
function LogVerify(){
  if(!auth.currentUser){
    router.push('/login')
   } 
}
  // Check if the user is logged in
useEffect(() =>{
  
   setTimeout(
    LogVerify, 1000);
}, )
return(
  <div>{children}</div>
)

}

