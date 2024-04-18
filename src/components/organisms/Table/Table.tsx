
import React, { useEffect, useState } from 'react';
import { Country } from 'types/Country';

interface TableProps {
    data: Country[];
    dataMessage: string;
}

const Table: React.FC<TableProps> = ({ data, dataMessage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Handling Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Sort columns
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const handleSort = (column: string) => {
        if (sortedColumn === column) {
            // If the same column is clicked, toggle sort direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            setCurrentPage(1);
        } else {
            // If a new column is clicked, set it as the sorted column and default to ascending order
            setSortedColumn(column);
            setSortDirection('asc');
            setCurrentPage(1); // Adding this to start from first page to see results in correct order
        }
    };

    const [sortedData, setSortedData] = useState<Country[]>([]);
    useEffect(() => {
        setSortedData(
            data
                .slice()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .sort((dataObj1: any, dataObj2: any) => {
                    // Perform sorting based on the sorted column and direction
                    if (sortedColumn) {
                        const dataObj1Value = dataObj1[sortedColumn];
                        const dataObj2Value = dataObj2[sortedColumn];
                        if (dataObj1Value < dataObj2Value) return sortDirection === 'asc' ? -1 : 1;
                        if (dataObj1Value > dataObj2Value) return sortDirection === 'asc' ? 1 : -1;
                        return 0;
                    }
                    return 0;
                })
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortDirection, currentPage]);

    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr className='bg-primary-title'>
                        <th
                            className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                            onClick={() => handleSort('number')}
                        >
                            No
                            {sortedColumn === 'number' && (
                                <span className='ml-1'>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </th>
                        <th
                            className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                            onClick={() => handleSort('name')}
                        >
                            Country Name
                            {sortedColumn === 'name' && (
                                <span className='ml-1'>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </th>
                        <th
                            className='px-6 py-3 font-medium text-gray-500 uppercase tracking-wider cursor-pointer'
                            onClick={() => handleSort('flag')}
                        >
                            Country Flag
                            {sortedColumn === 'flag' && (
                                <span className='ml-1'>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {sortedData.length > 0 ? (
                        sortedData.map((country, index) => (
                            <tr key={index}>
                                <td className='px-6 py-4 whitespace-nowrap'>{country.number}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{country.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{country.flag}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className='text-center py-4 pt-32'>
                                {dataMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                <nav className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                    <div className='hidden sm:block'>
                        <p className='text-sm text-gray-700'>
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                            <span className='text-primary-background'>{Math.min(currentPage * itemsPerPage, data.length)} of {data.length} results</span>
                        </p>
                    </div>
                    <div className='flex-1 flex justify-between sm:justify-end'>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-primary-background bg-primary-title hover:bg-gray-50 cursor-pointer'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastItem >= data.length}
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-primary-background bg-primary-title hover:bg-gray-50 cursor-pointer'
                        >
                            Next
                        </button>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Table;
