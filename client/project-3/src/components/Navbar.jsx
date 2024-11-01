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
import { jwtDecode } from "jwt-decode";


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
  
  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    
    // Decode token to get userId
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Sesuaikan dengan nama field di token Anda
    
    try {
      const response = await pull({
        method: "GET",
        url: `/user/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log("🚀 ~ fetchUser ~ error:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const updateUserImage = async () => {
    const token = localStorage.getItem("access_token");
    const userId = jwt_decode(token).id;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await pull({
        method: "PATCH",
        url: `/user/${userId}/imgUrl`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });

      Swal.fire({
        title: response.data.message,
        icon: "success",
      });
      setUser(response.data.user); // Update user state with new data
      setModalVisible(false); // Close modal after success
    } catch (error) {
      console.log("🚀 ~ updateUserImage ~ error:", error);
      Swal.fire({
        title: "Error updating image",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
            <DropdownItem key="logout" color="danger">
              <Link onClick={handleLogOut} to="/login">Log Out</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
