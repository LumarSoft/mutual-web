import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-end px-8 border-b">
      <DropdownNav />
    </nav>
  );
};

const DropdownNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <GiHamburgerMenu size={35} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Cerrar sesion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
