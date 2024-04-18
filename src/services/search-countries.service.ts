import { Country } from 'types/Country';
import { API_URL } from 'utils/constants';

interface CountryAPIResponse {
    apiData: Country[],
    apiMessage: string;
}
const searchCountriesService = async (searchTerm: string): Promise<CountryAPIResponse> => {
    const apiResponse = await fetch(`${API_URL}${searchTerm}`);
    const countries = await apiResponse.json();
    let data = [];
    let dataMessage = '';

    if (countries.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data = countries.map((countryObj: any, index: number) => {
            return {
                number: index + 1,
                name: countryObj?.name?.common,
                flag: countryObj?.flag
            };
        });
    } else {
        if (countries.message === 'Not Found') {
            dataMessage = 'No result found!';
        } else {
            dataMessage = 'Please Start searching...';
        }
        data = [];
    }
    return { apiData: data, apiMessage: dataMessage };
};

export default searchCountriesService;
