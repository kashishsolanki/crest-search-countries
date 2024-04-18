import { useEffect, useRef, useState } from 'react';

import { SearchBox } from 'atoms';
import { Country } from 'types/Country';
import { Table } from 'organisms';
import { LoadingCountries } from 'assets';

import searchCountriesService from 'services/search-countries.service';

function SearchCountries() {
    const [data, setData] = useState<Country[]>([]);
    const [dataMessage, setDataMessage] = useState<string>('Please Start searching...');
    const [loading, setLoading] = useState(false);

    // search input ref for Ctrl/Cmd + k keydown event
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if Ctrl (or Cmd) + K is pressed
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus(); // Focus on the search box
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // API call to retrieve a data
    const fetchData = async (searchTerm: string) => {
        setLoading(true);
        try {
            // Calling central API function from diff file
            const { apiData, apiMessage } = await searchCountriesService(searchTerm);
            setData(apiData);
            setDataMessage(apiMessage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto my-8 font-roboto'>
            <h1 className='text-3xl text-center text-primary-background'>Crest Search Countries</h1>
            <SearchBox onSearch={fetchData} inputRef={inputRef} />

            <div className='mt-16'>
                {loading ? (
                    <div className='text-center mt-4'>
                        <img src={LoadingCountries} className='w-[50px] h-[50px]' alt='loading...' />
                    </div>
                ) : (
                    <Table data={data} dataMessage={dataMessage} />
                )}
            </div>
        </div>
    );
}

export default SearchCountries;
