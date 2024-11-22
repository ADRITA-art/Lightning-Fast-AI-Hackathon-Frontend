"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import FlickeringGrid from "@/Components/ui/flickering-grid";
import BlurIn from "@/Components/ui/blur-in";
import TextReveal from "@/Components/ui/text-reveal";
import GradientButton from "./ButtonComponent";
const components = [
  {
    title: "Article Generator",
    href: "#",
    description:
      "Generate informative articles on any topic to enhance your knowledge base.",
  },
  {
    title: "Question Generator",
    href: "#",
    description:
      "Generate questions on any topic to test your knowledge and understanding.",
  },
  {
    title: "Performance Evaluator",
    href: "#",
    description:
      "Give questions and upload respective answers to get a detailed performance report.",
  },
  {
    title: "Prepia",
    href: "#",
    description:
      "A 3D model to acknowledge interactive classroom experience",
  },
];

export function ProductSection() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
    <BlurIn
    word="Your Preparation Tools"
    className="text-xl font-bold text-black dark:text-white"
  />
    <div className="w-full flex justify-center">
        
        
   <Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-4xl" 
>
<Carousel
  plugins={[plugin.current]}
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.reset}
  className="w-full max-w-xl mx-auto" 
>
  <CarouselContent className="flex items-center">
    {components.map((product, index) => (
      <CarouselItem
        key={index}
        className="flex-shrink-0 flex justify-center w-full sm:w-auto"
      >
        <div className="p-4">
          <Card className="shadow-lg border rounded-md h-80 w-full sm:w-96 relative overflow-hidden">
           
            <FlickeringGrid
              className="absolute inset-0 z-10" 
              squareSize={4}
              gridGap={6}
              color="#FFD700"
              maxOpacity={0.3} 
              flickerChance={0.1}
            />
           

            <CardContent className="relative p-6 flex flex-col justify-between h-full z-20 text-black">
             
              <div className=" flex-col justify-center text-center m-auto">
                <h1 className="text-xl font-semibold mb-2">{product.title}</h1>
                <p className="text-sm ">
                  {product.description}
                </p>
                <div className="w-[8.5rem] m-auto mt-24 ">
              <Link href={product.href}>
               <GradientButton>Try It Out</GradientButton>
              </Link>
              </div>
              </div>
              
              
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  
  <CarouselPrevious className="hidden sm:block " />
  <CarouselNext className="hidden sm:block " />

</Carousel>

</Carousel>

  </div>
  
  </>
  );
}
