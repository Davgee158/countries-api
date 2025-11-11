import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function CountryDetail({ isDarkMode }) {
    const { name } = useParams()
    const navigate = useNavigate()
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [codeToName, setCodeToName] = useState({})

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const res = await fetch('/data.json')
                if(!res.ok) throw new Error('Fetch failed')
                const data = await res.json()
                const codeToName = Object.fromEntries(data.map(c => [c.alpha3Code, c.name]))
                setCodeToName(codeToName)
                const foundCountry = data.find(c => c.name.toLowerCase() === name.toLowerCase())
                if(!foundCountry) throw new Error('Country not found')
                setCountry(foundCountry)
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCountry()
    }, [name])

   
    if(loading) return <div className='text-center py-8'>Loading...</div>
    if(error) return <div className='text-center py-8 text-red'>{error}</div>


    return(
        <main className='max-w-[375px] md:max-w-[700px] md:mx-auto xl:max-w-[1100px] 2xl:max-w-[1440px] py-12 px-6'>
            <button 
                onClick={() => navigate(-1)} 
                className={`${isDarkMode ? 'bg-dark-blue-text transition-colors duration-300 ease-in out' : 'bg-white'} 
                            py-2 px-8 md:text-base md:px-10 text-xs shadow-md rounded hover:cursor-pointer transition-colors transition-transform duration-200 ease-out hover:scale-[1.05] `}>
                                Back
            </button>
            <div className='xl:flex gap-20 2xl:gap-32 mt-12'>
                <div className='relative w-full max-w-md aspect-[3/2] mb-6'>
                    <img className="absolute inset-0 h-full w-full object-contain " src={country.flags.png} alt={country.name} />
                </div>

                <div className='py-4'>
                    <h1 className='font-extrabold text-xl md:text-3xl pb-3'>{country.name}</h1>
                    <div className='xl:flex text-sm md:text-base gap-10 '>
                        <div className='mb-6'>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'>Native Name: </span>
                            {country.nativeName}
                        </p>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'>Population: </span>
                            {country.population.toLocaleString()}
                        </p>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'> Region: </span>
                            {country.region}
                        </p>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'> Sub Region: </span>
                            {country.subregion}
                        </p>
                        <p className='font-light'>
                            <span className='font-semibold'>Capital: </span>
                            {country.capital || 'N/A'}
                        </p>
                        </div>

                        <div>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'>Top Level Domain: </span>
                            {country.topLevelDomain}
                        </p>
                        <p className='pb-1 font-light'>
                            <span className='font-semibold'>Currencies: </span>
                            {(country.currencies || []).map(currency => currency.name).join(', ') || 'N/A'}
                        </p>
                        <p className='font-light'>
                            <span className='font-semibold'>Languages: </span>
                            {(country.languages || []).map(language => language.name).join(', ') || 'N/A'}
                        </p>
                        </div>
                    </div>

                    <div>
                        <h2 className='pr-4 mt-6 font-semibold md:text-lg'>Border Countries: </h2>
                        <div className="mt-2 md:mt-4 flex flex-wrap gap-2">
                            {(country?.borders || []).map(code => {
                            const name = codeToName?.[code] || code;
                            return (
                                 <span
                                    key={code}
                                    className={`px-5 py-1 md:px-8 md:py-2 mr-2 md:mr-3 text-sm md:text-base rounded-xs md:rounded-sm shadow-sm whitespace-nowrap transition-colors duration-300 ease-in out ${isDarkMode ? "bg-dark-blue-bg " : 'bg-white'} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} hover:cursor-pointer`}
                                >
                                    <Link to={`/country/${name}`}>{name}</Link>
                                </span>
                                );
                            })}
                            {(!country?.borders || country.borders.length === 0) && <span className="text-xs">Not Available</span>}
                        </div>
                        
                  

                    </div>
                </div>
            </div>
        </main>
    )  
}