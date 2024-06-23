import logo from "../assets/py.png";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-around h-38 relatve max-w-full ">
      <div className="flex relative space-x-8">
        <Link to={"/"}>
          <button className=""> HOME</button>
        </Link>
        <Link to={"/product-listing"}>
          <button className=""> SHOP</button>
        </Link>
        <Link to={"/blog-listing"}>
          <button className=""> BLOG</button>
        </Link>
        <Link to={"/contact-listing"}>
          <button className=""> CONTACT</button>
        </Link>
      </div>
      <div className="size-36">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" flex space-x-8 relative">
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Link to={"/sign-in"}>
          <button>
            <FaUserCircle size={25} />
          </button>
        </Link>
        <Link to={"/shopping-cart"}>
          <button>
            <GiShoppingBag size={35} />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
