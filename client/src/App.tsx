import { useState } from 'react'
import './App.css'
import {Link} from "react-router-dom";

function App() {

  return (
    <>
     <main className={"p-20 h-screen "}>
         
         <div className={"w-full h-full bg-slate-800 rounded-lg outline-2 outline-slate-700 p-5"}>
             <h1 className={"text-slate-100"}>Hello World!</h1>
             <nav className={"flex items-center justify-center"}>
                 <li><Link to="/" className="w-full decoration-none bg-slate-600 rounded-lg py-2 hover:slate-600/80 hover:scale-103">Birds Listing</Link></li>
             </nav>
             
         </div>
     </main>
    </>
  )
}

export default App
