"use client";
import { RainbowButton } from "@/Components/ui/rainbow-button";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { FiMenu, FiX } from "react-icons/fi"; 
import PulsatingButton from "@/Components/ui/pulsating-button";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Article Generator",
    href: "#",
    description:
      "Generate informative articles on any topic to enhance your knowledge base.",
  },
  {
    title: "Practice Tests",
    href: "#",
    description:
      "Challenge yourself with timed tests across various topics to track your progress.",
  },
  {
    title: "Study Planner",
    href: "#",
    description:
      "Organize and schedule your study sessions to stay on top of your goals.",
  },
  {
    title: "Virtual Interview",
    href: "#",
    description:
      "Simulate real interviews, get feedback, and improve your responses based on you responses and facial expressions",
  },
];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to handle menu toggle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
 
      <div className="flex items-center">
        <Link href="/">
          <img
            src="https://i.postimg.cc/fLzrwTWD/prepify.png"
            alt="Logo"
            className=" w-16 h-16"
          />
        </Link>
        <span className="ml-2 text-lg font-semibold">Prepify</span>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

    
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex space-x-6">
       
          <NavigationMenuItem>
            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link href="/" legacyBehavior>
                      <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Who We Are
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                        Prepify
                        <br/><br/>
                        Whether it is for your college exams or your dream job, Prepify offers the best tools and courses to help you succeed. Learn anytime, anywhere with ease!
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem title="Our Vision">
                To empower every learner to achieve academic and career success, anywhere, anytime.</ListItem>
                <ListItem title="Our Mission">
                Prepify delivers accessible, personalized tools and resources to support learners in exams, interviews, and skill-building.</ListItem>
                <ListItem title="Our Values">
                Accessibility Innovation Integrity Empowerment Excellence Personalization 
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Components Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Prepare</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Documentation Link */}
          <NavigationMenuItem>
            <Link href="#" className={navigationMenuTriggerStyle()}>
              Blogs
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard">
        <PulsatingButton className='bg-white text-black' pulseColor="#FFD700">Dashboard</PulsatingButton>
        </Link>
        <Link href="#">
        <RainbowButton>Sign In</RainbowButton>
          
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-10">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/" onClick={toggleMenu} className="block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" onClick={toggleMenu} className="block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/interview" onClick={toggleMenu} className="block">
                <PulsatingButton disabled className='bg-white text-black' pulseColor="#FFD700">Virtual Interview (Beta)</PulsatingButton>
         
                </Link>
              </li>
              <li>
                <Link href="#" onClick={toggleMenu} className="block">
                <RainbowButton>Sign In</RainbowButton>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href="#">
          <div
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
