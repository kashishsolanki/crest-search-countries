import React, { useEffect, useState } from 'react';

interface SearchBoxProps {
    onSearch: (searchText: string) => void;
    inputRef: React.Ref<HTMLInputElement>;
}

function SearchBox({ onSearch,inputRef }: SearchBoxProps) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value.trim());
    };

    useEffect(() => {
        // debounce the search function call
        const getData = setTimeout(() => {
            onSearch(searchText);
        }, 500);

        return () => clearTimeout(getData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    return (
        <div className='relative'>
            <input
                ref={inputRef}
                type='text'
                placeholder='Search Country'
                value={searchText}
                onChange={handleInputChange}
                className='w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
        </div>
    );
}

export default SearchBox;
