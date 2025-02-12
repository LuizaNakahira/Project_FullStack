import React, { createContext, useState } from "react";
import { fetchCountries } from "../services/api";

export const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async ({ countryName }) => {
    if (!countryName) {
      setErrorMessage("No country found. Fill the country name and click for search.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchCountries({ countryName });
      if (data.length === 0) {
        setErrorMessage("No country with that name was found.");
        setCountries([]);
      } else {
        setCountries(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error when searching for countries:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAll = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCountries({});
      setCountries(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error when fetching all countries:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CountriesContext.Provider
      value={{ countries, errorMessage, isLoading, handleSearch, handleShowAll }}
    >
      {children}
    </CountriesContext.Provider>
  );
}
