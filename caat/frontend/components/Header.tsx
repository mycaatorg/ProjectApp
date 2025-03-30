"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [showContact, setShowContact] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center relative">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span className="ml-2 font-bold text-lg">CAAT</span>
      </Link>

      {/* Right Side - Contact Us */}
      <div className="ml-auto relative">
        <button
          onClick={() => setShowContact((prev) => !prev)}
          className="hover:underline font-medium"
        >
          Contact Us
        </button>

        {showContact && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md px-4 py-2 text-sm z-10">
            <span className="font-medium">caat1225@gmail.com</span>
          </div>
        )}
      </div>
    </nav>
  );
}
