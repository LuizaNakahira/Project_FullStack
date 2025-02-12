import axios from 'axios';

export const fetchCountries = async ({ countryName }) => {
    try{
        let url = 'https://restcountries.com/v3.1/all';

        if(countryName){
            url = `https://restcountries.com/v3.1/name/${countryName}`;
        }

        const response = await axios.get(url);

        const filteredCountries = countryName
            ? response.data.filter(
                (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
            )
            : response.data;

        return filteredCountries;

    } catch (error) {
        console.log('Error when searching for countries:', error);
        throw error;
    };
};