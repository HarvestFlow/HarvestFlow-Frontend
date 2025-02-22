import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-200 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-white">MySite</a>

        {/* Menu Mobile Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="text-white hover:text-green-300">Accueil</a></li>
          <li><a href="#" className="text-white hover:text-green-300">Services</a></li>
          <li><a href="#" className="text-white hover:text-green-300">À propos</a></li>
          <li><a href="#" className="text-white hover:text-green-300">Contact</a></li>
        </ul>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <ul className="md:hidden bg-green-300 text-white space-y-4 p-4">
          <li><a href="#" className="block text-white">Accueil</a></li>
          <li><a href="#" className="block text-white">Services</a></li>
          <li><a href="#" className="block text-white">À propos</a></li>
          <li><a href="#" className="block text-white">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
