import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DeleteUserAlert } from "./DeleteAlert";
import { UpdateDialog } from "./updateDialog";
import { User } from "./Columns";

export const DropDownRow = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DeleteUserAlert uidUser={user.uid}>Eliminar usuario</DeleteUserAlert>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UpdateDialog user={user}>Editar usuario</UpdateDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
