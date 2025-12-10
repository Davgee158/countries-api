import "./App.css";
import "./index.css";
import NavBar from "./NavBar";
import SearchArea from "./SearchArea";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useDebounce from "./hooks/useDebounce";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode ? "bg-dark-blue-bg text-gray-300" : "bg-grey-bg"
      } transition-colors duration-300 ease-in-out`}
    >
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <div>
                  <SearchArea
                    value={searchTerm}
                    onChange={setSearchTerm}
                    region={selectedRegion}
                    onRegionChange={setSelectedRegion}
                    isDarkMode={isDarkMode}
                  />
                  <Countries
                    searchTerm={debouncedSearchTerm}
                    region={selectedRegion}
                    isDarkMode={isDarkMode}
                  />
                </div>
              }
            />
            <Route
              path="/country/:name"
              element={<CountryDetail isDarkMode={isDarkMode} />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
