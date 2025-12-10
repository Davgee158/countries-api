import "./App.css";

function NavBar({ isDarkMode, setIsDarkMode }) {
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav
      className={`w-full shadow-md ${
        isDarkMode
          ? "bg-gray-700 transition-colors duration-300 ease-in out"
          : "bg-white"
      }`}
    >
      <div className="py-6 max-w-[375px] mx-auto px-4 md:max-w-[720px] xl:max-w-[1100px] 2xl:max-w-[1440px]">
        <div className="flex justify-between items-center">
          <h1 className="font-extrabold text-lg">Where in the world?</h1>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 hover:cursor-pointer focus:outline-none focus:ring-2 rounded-lg px-4 py-2"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <img src="/crescent-moon-svgrepo-com.svg" alt="" className="w-3" />
            <span className="text-sm font-semibold">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
