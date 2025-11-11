import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function Countries({ searchTerm, region, isDarkMode }) {
    const { name } = useParams()
    const navigate = useNavigate()
    const [countries, setCountries] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(16);

    useEffect(() => {
        const getData = async() => {
           try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const res = await fetch('/data.json');
            if(!res.ok) throw new Error('Fetch failed');
            const data = await res.json();
            setCountries(data);
           } catch(err){
            setError(err.message)
           } finally {
            setLoading(false);
           } 
           
        };
        getData();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
            ) {
                setVisibleCount((prevCount) => prevCount + 16);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if(loading) return <div className='text-center py-8'>Loading...</div>;
    if(error) return <div className='text-center py-8 text-red'>{error}</div>

    const normalizedSearch = (searchTerm || '').trim().toLowerCase();
    const normalizedRegion = (region || '').trim().toLowerCase();

    const filteredCountries = countries.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(normalizedSearch);
        const matchesRegion = normalizedRegion ? c.region.toLowerCase() === normalizedRegion : true;
        return matchesSearch && matchesRegion;
    })
    
    if(!filteredCountries.length) return <div className='text-center py-8'>No countries match your search.</div>


    return (
        <div className='max-w-[375px] md:max-w-[720px] xl:max-w-[1440px] mx-auto px-12'>
            <div className='md:grid md:grid-cols-2 xl:grid-cols-4 gap-12'>
                {filteredCountries.slice(0, visibleCount).map((country) => {
                    return (
                        <div 
                            key={country.name} 
                            style={{ animation: 'fadeIn 250ms ease-out both' }}
                            className={`${isDarkMode ? 'bg-dark-blue-bg text-gray-300' : 'bg-white text-gray-800 '} shadow-md rounded-lg hover:cursor-pointer transition-transform transition-shadow duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg`}
                        >
                            <Link to={`/country/${country.name}`} className='block'>
                            <div className='h-40 w-full overflow-hidden rounded-t-lg'>
                                <img src={country.flags.png} alt={`Flags of ${country.name}`} className='h-full w-full object-cover' lazy='loading' />
                            </div>
                          
                            <div className='mt-3 mx-4 mb-8 pb-6 md:pb-0 transition-colors duration-300 ease-in out'>
                                <h2 className='text-lg font-extrabold pb-3'>{country.name}</h2>
                                <p className='text-sm font-light'>
                                    <span className='font-semibold'>Population: </span>
                                    {country.population.toLocaleString()}
                                </p>
                                <p className='text-sm font-light'>
                                    <span className='font-semibold'>Region: </span>{country.region}
                                </p>
                                <p className='text-sm font-light '>
                                    <span className='font-semibold'>Capital: </span>
                                    {country.capital || 'N/A'}
                                </p>
                            </div>
                            </Link>
                            
                        </div>
                    )
                })}
                {visibleCount < filteredCountries.length && <div>Loading more...</div>}
            </div>
        </div>
    )
}