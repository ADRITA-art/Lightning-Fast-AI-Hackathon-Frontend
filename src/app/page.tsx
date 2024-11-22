import Image from "next/image";
import Navbar from "./components/Nav";
import { Hero } from "./components/Hero";

import { ProductSection } from "./components/ProductSection";
import Footer from "./components/Footer";
export default function Home() {
  return (
   <div >
    <Navbar></Navbar>
    <Hero></Hero>
    <ProductSection></ProductSection>
    <Footer></Footer>
   </div>
  );
}
