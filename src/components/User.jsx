import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "../contexts/hooks/useLogout";

const User = ({ userAvartar }) => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center cursor-pointer">
            {userAvartar}
            <img src="/images/dropdown.svg" alt="" className="w-3" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/dashboard/setting">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default User;
