import Image from "next/image";
import Navbar from "./components/Nav";
import { Hero } from "./components/Hero";

import Footer from "./components/Footer";
export default function Home() {
  return (
   <div >
    <Navbar></Navbar>
    <Hero></Hero>
    
    <Footer></Footer>
   </div>
  );
}
