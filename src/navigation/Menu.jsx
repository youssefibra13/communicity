import { Outlet, NavLink, Link } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import SearchBar from "../components/searchbar";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import AuthButton from "../components/AuthButton";

const Menu = () => {
  return (
    <div className="relative">
      <header className="sticky top-0 w-full bg-red-500 p-4 flex flex-row items-center justify-between z-10">
        <div className="flex flex-row items-center">
          <Link to="/">
            <img src="CommuniCITY.svg" alt="CommuniCITY Logo" />
          </Link>
          {/* Place SearchBar or other elements next to the logo */}
          {/* <SearchBar onSearch={onSearch} /> */}
        </div>
        {/* Other navigation items if necessary */}
        <AuthButton />
      </header>
      <main className="pt-[header height]">
        {/* Replace [header height] with the actual height of your header */}
        <Outlet />
      </main>
      {/* Footer navigation can go here */}
    </div>
  );
};

export default Menu;
