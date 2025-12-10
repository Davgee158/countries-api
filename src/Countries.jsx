import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { getCachedCountries } from "./utils/countryCache";

export default function Countries({ searchTerm, region, isDarkMode }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    const getData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getCachedCountries(); // ← Use cache instead of fetch
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setVisibleCount((prevCount) => prevCount + 16);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading)
    return <Spinner size={50} color={isDarkMode ? "#9ca3af" : "#374151"} />;
  if (error)
    return (
      <div
        className={`text-center py-12 ${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <p className="text-lg font-bold mb-4">Oops! Couldn't load countries</p>
        <button
          onClick={() => window.location.reload()}
          className={`px-6 py-2 rounded shadow-md cursor-pointer 
  focus:outline-none focus:ring-2 ${
    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-800"
  }`}
        >
          Try Again
        </button>
      </div>
    );

  const normalizedSearch = (searchTerm || "").trim().toLowerCase();
  const normalizedRegion = (region || "").trim().toLowerCase();

  const filteredCountries = countries.filter((c) => {
    const matchesSearch = normalizedSearch
      ? c.name.toLowerCase().includes(normalizedSearch) ||
        (c.capital && c.capital.toLowerCase().includes(normalizedSearch))
      : true;
    const matchesRegion = normalizedRegion
      ? c.region.toLowerCase() === normalizedRegion
      : true;
    return matchesSearch && matchesRegion;
  });

  if (!filteredCountries.length)
    return (
      <div className="text-center py-8">No countries match your search.</div>
    );

  return (
    <div className="max-w-[375px] md:max-w-[720px] xl:max-w-[1440px] mx-auto px-12">
      {(searchTerm || region) && (
        <p
          className={`text-sm mb-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Found {filteredCountries.length}{" "}
          {filteredCountries.length === 1 ? "country" : "countries"}
          {searchTerm && ` matching "${searchTerm}"`}
          {region && ` in ${region}`}
        </p>
      )}
      <div className="md:grid md:grid-cols-2 xl:grid-cols-4 gap-12 ">
        {filteredCountries.slice(0, visibleCount).map((country) => {
          return (
            <div
              key={country.name}
              style={{ animation: "fadeIn 250ms ease-out both" }}
              className={`${
                isDarkMode
                  ? "bg-dark-blue-bg text-gray-300"
                  : "bg-white text-gray-800 "
              } shadow-md rounded-lg hover:cursor-pointer transition-transform transition-shadow duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <Link
                to={`/country/${country.name}`}
                className="block"
                tabIndex={-1}
              >
                <div className="h-40 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={country.flags.png}
                    alt={`Flags of ${country.name}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 mx-4 mb-8 pb-6 md:pb-0 transition-colors duration-300 ease-in out">
                  <h2 className="text-lg font-extrabold pb-3">
                    {country.name}
                  </h2>
                  <p className="text-sm font-light">
                    <span className="font-semibold">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p className="text-sm font-light">
                    <span className="font-semibold">Region: </span>
                    {country.region}
                  </p>
                  <p className="text-sm font-light ">
                    <span className="font-semibold">Capital: </span>
                    {country.capital || "N/A"}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        {visibleCount < filteredCountries.length && (
          <div className="col-span-full flex justify-center py-4">
            <Spinner size={30} color={isDarkMode ? "#9ca3af" : "#374151"} />
          </div>
        )}
      </div>
    </div>
  );
}
