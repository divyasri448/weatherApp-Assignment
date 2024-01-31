import "./index.css";
import { TbAlignJustified } from "react-icons/tb";
import { GoLocation } from "react-icons/go";

const Navbar = (props) => {
  const { setIsClickedHambugerIocn, isClickedHambugerIocn, currentLocation } =
    props;

  const handleHamburgerIcon = () => {
    setIsClickedHambugerIocn((prevStatus) => !prevStatus);
    console.log(isClickedHambugerIocn);
    console.log("HI");
  };
  return (
    <div className="navbar-container">
      <TbAlignJustified
        style={{ marginLeft: isClickedHambugerIocn ? "0" : "195px" }}
        className="hamburger-icon"
        onClick={handleHamburgerIcon}
      />
      <div className="navbar-location-container">
        <GoLocation className="location-icon" />
        <p className="navbar-location">{currentLocation}</p>
      </div>
    </div>
  );
};

export default Navbar;
