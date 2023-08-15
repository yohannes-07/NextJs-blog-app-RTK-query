import React from 'react';
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-semibold">My Blog</Link>
        
      </div>
    </header>
  );
};

export default Header;
