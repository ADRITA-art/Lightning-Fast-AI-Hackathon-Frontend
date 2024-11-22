import { ChevronRight } from "lucide-react";
import Marquee from "@/Components/ui/marquee";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/Components/ui/animated-gradient-text";
import GradualSpacing from "@/Components/ui/gradual-spacing";
import LetterPullup from "@/Components/ui/letter-pullup";
import OrbitingCircles from "@/Components/ui/orbiting-circles";
import Ripple from "@/Components/ui/ripple";
import RetroGrid from "@/Components/ui/retro-grid";
import AnimatedShinyText from "@/Components/ui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
 import Link from "next/link";
export async function Hero() {
   
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
 
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};  
  return (
    <div className="">
      <Link href={'https://lightning-fast-ai-hackathon-frontend.vercel.app/'}>
    <div className="z-10 flex h-20 items-center justify-center px-4 sm:px-8">
      
  <AnimatedGradientText>
    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
    <span
      className={cn(
        `inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] text-transparent bg-clip-text text-sm sm:text-base`
      )}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      Introducing Prepia - Exclusive Access
    </span>
    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
  </AnimatedGradientText>
  
</div>
</Link>


    <div className="flex justify-center mt-2 px-5 sm:px-8 md:px-16 lg:px-24 text-center">
  <GradualSpacing
    className="text-center text-sm sm:text-base md:text-lg tracking-tighter font-display font-bold text-gray-500 dark:text-white"
    text="Start Your Learning Journey with us"
  />
</div>
<div className="mt-2 px-5 sm:px-8 md:px-16 lg:px-24 text-center">
  <LetterPullup 
    className="font-display break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black dark:text-white leading-snug sm:leading-tight md:leading-tight lg:leading-[4.5rem]"
    words={"From Preparation to Destination"} 
    delay={0.05} 
  />
</div>



<div className="relative  flex min-h-[400px] md:min-h-[500px] w-full flex-col items-center justify-center overflow-visible rounded-lg bg-background">
  <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
    <img
      src="https://i.postimg.cc/fLzrwTWD/prepify.png"
      alt="Logo"
      className="h-12 w-auto md:h-16 "
    />
  </span>

  {/* Inner Circles */}
  <OrbitingCircles
    className="size-[20px] text-center md:size-[30px] border-none bg-transparent"
    duration={20}
    delay={20}
    radius={80}
  >
    Article Generator
  </OrbitingCircles>
  <OrbitingCircles
    className="size-[20px] text-center md:size-[30px] border-none bg-transparent"
    duration={20}
    delay={10}
    radius={80}
  >
    Question Generator
  </OrbitingCircles>

  {/* Outer Circles (reverse) */}
  <OrbitingCircles
    className="size-[40px] px-2 text-center md:size-[50px] border-none bg-transparent"
    radius={160}
    duration={20}
    reverse
  >
    Performance Evaluator
  </OrbitingCircles>
  <OrbitingCircles
    className="size-[40px] text-center px-2 md:size-[50px] border-none bg-transparent"
    radius={160}
    duration={20}
    delay={20}
    reverse
  >
    Prepia
  </OrbitingCircles>
  <RetroGrid angle={40}/>
</div>


<div className="w-full bg-white py-10 px-4">
  <div className="text-center text-3xl font-bold  text-gray-800 mb-5">
    What Our Learners Say
  </div>
  <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      </div>

    </div>
  );
}
