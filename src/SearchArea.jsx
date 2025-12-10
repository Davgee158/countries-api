export default function SearchArea({
  value,
  onChange,
  region,
  onRegionChange,
  isDarkMode,
}) {
  const clearSearch = () => {
    onChange("");
  };

  return (
    <div className="my-8 mx-6 md:mx-14 xl:mx-[6rem] 2xl:mx-[15rem] md:flex justify-between">
      <div className="relative">
        <img
          src="search-svgrepo-com.svg"
          alt="search-icon"
          className="w-5 absolute top-4 left-6"
        />
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for a country..."
            className={`text-sm w-full md:w-sm h-12 shadow-md py-5 px-16 mb-6 rounded-sm transition-colors transition-shadow duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 text-gray-300 transition-colors duration-300 ease-in out"
                : ""
            }`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {value && (
            <button
              type="button"
              onClick={clearSearch}
              className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isDarkMode
                  ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>
      <div>
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          id="regions"
          className={`h-12 text-sm w-[10rem] cursor-pointer rounded-sm shadow-md p-3 ${
            isDarkMode
              ? "bg-gray-700 text-gray-300 transition-colors duration-200"
              : ""
          }`}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}
