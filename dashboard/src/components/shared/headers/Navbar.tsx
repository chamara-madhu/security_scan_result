import Logo from "../../../assets/images/logo.jpg";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 shadow-lg bg-purple-950 h-14">
      <div className="flex items-center w-full h-full px-4">
        <img src={Logo} alt="Security scan result logo" className="w-[250px]" />
      </div>
    </nav>
  );
};

export default Navbar;
