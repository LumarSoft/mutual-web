import { FaRegUserCircle } from "react-icons/fa";


export const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-8 border-b">
      <div>
        <ul className="flex gap-4 font-semibold">
          <li>Opcion1</li>
          <li>Opcion2</li>
          <li>Opcion3</li>
        </ul>
      </div>
      <FaRegUserCircle size={35} />
    </nav>
  );
};
