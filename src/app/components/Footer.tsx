import { FC } from "react";
import { cn } from "@/lib/utils";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className={cn("bg-white border-t border-gray-200 py-8 text-gray-600")}>
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4">
        <div className="p-4 text-center sm:text-left">
          <h2 className="font-bold text-gray-900">Product</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-500">Features</a></li>
            <li><a href="#" className="hover:text-blue-500">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
            
          </ul>
        </div>
        <div className="p-4 text-center sm:text-left">
          <h2 className="font-bold text-gray-900">Company</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-500">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500">Careers</a></li>
            <li><a href="#" className="hover:text-blue-500">Blog</a></li>
            <li><a href="#" className="hover:text-blue-500">Press</a></li>
            <li><a href="#" className="hover:text-blue-500">Partners</a></li>
          </ul>
        </div>
        <div className="p-4 text-center sm:text-left">
          <h2 className="font-bold text-gray-900">Resources</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:text-blue-500">Community</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            <li><a href="#" className="hover:text-blue-500">Support</a></li>
            <li><a href="#" className="hover:text-blue-500">Status</a></li>
          </ul>
        </div>
        <div className="p-4 text-center sm:text-left">
          <h2 className="font-bold text-gray-900">Social</h2>
          <ul className="mt-2 flex justify-center sm:justify-start gap-4">
            <li><a href="#" aria-label="Twitter" className="hover:text-blue-500"><FaSquareXTwitter /></a></li>
            <li><a href="#" aria-label="Instagram" className="hover:text-blue-500"><FaInstagram /></a></li>
            <li><a href="#" aria-label="Youtube" className="hover:text-blue-500"><FaYoutube /></a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4 border-t border-gray-200 pt-4 px-4">
        <p>Made with Inquisitiveness by Sagnik Datta</p>
      </div>
    </footer>
  );
};

export default Footer;
