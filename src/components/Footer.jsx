import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/images/pro2 1.svg" alt="" />
            <p className="text-sm">
              We&apos;ve enabled properties and other real estate assets further
              visibility through the Prop-tech digital market. Hence a safe and
              trusted tool for all kinds of real estate market
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#how-it-works" className="hover:text-purple-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-purple-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                to="https://www.facebook.com/profile.php?id=100090156995333&mibextid=JRoKGi"
                className="hover:text-purple-300"
              >
                <Facebook />
              </a>
              <a
                to="https://twitter.com/myPropoutAI "
                className="hover:text-purple-300"
              >
                <Twitter />
              </a>
              <a
                to="https://www.instagram.com/mypropoutai/"
                className="hover:text-purple-300"
              >
                <Instagram />
              </a>
              <a
                to="https://www.linkedin.com/in/propout-nft-37966028a/"
                className="hover:text-purple-300"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-800 text-center">
          <p>&copy; {new Date().getFullYear()} PropOut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
