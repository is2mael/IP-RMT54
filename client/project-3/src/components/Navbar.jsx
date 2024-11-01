import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./helpers/AcmeLogo";
import { useEffect, useState } from "react";
import { pull } from "@/utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function App() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const nav = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("access_token");
    nav("/login");
    Swal.fire({
      title: "Kamu Berhasil LogOut!",
      text: "You clicked the button!",
      icon: "success",
    });
  };

//   const fetchUser = async () => {
//     try {
//       const response = await pull({
//         method: "GET",
//         url: `/user/${userId}`,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       });

//       console.log(response.data.user);
//       setUser(response.data.user);
//     } catch (error) {
//       console.log("🚀 ~ fetchUser ~ error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ILGram</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/home">
            Explore
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/favorite" aria-current="page" color="secondary">
            Favorites
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user ? user.username : "User"}
              size="sm"
              src={user ? user.imgUrl : undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {user ? user.username : "Loading..."}
              </p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
            <Link onClick={handleLogOut} to="/login">Log Out</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
