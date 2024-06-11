import logo from "../assets/py.png";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-around h-38 relatve ">
      <div className="flex relative space-x-8">
        <Link to={"/product-listing"}>
          <button className=""> SHOP</button>
        </Link>

        <button className="">OUR STORY</button>
        <button className="">CONTACT</button>
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
        <button>
          <FaUserCircle size={25} />
        </button>
        <button>
          <GiShoppingBag size={35} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
