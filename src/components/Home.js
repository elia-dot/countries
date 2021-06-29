import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CountryCard from "./CountryCard";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router";

const ErrorMsg = styled.div`
  width: 280px;
  background: #ffe6e6;
  border: 1px solid #ff9999;
  margin: 4em auto 0;
  padding: 0.3em 0.6em;
  border-radius: 0.8em;
  color: ${({ theme }) => theme.text};
`;
const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 2em auto;
  @media (max-width: 600px) {
    width: 95%;
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  @media (max-width: 600px) {
    margin-bottom: 2em;
  }
`;

const SearchInput = styled.input`
  background: white;
  padding: 0.3em 1em;
  font-size: 1.2em;
  border: 0.3px solid lightgray;
  border-radius: 10px;
  outline: none;
  &:focus {
    border: 0.3px solid lightblue;
  }
  &::placeholder {
    font-size: 0.9em;
  }
  @media (max-width: 600px) {
    width: 250px;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 1.5em;
  margin-left: 0.5em;
  margin-top: 0.3em;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  cursor: pointer;
  background: white;
  padding: 0.3em 1em;
  font-size: 1.2em;
  border: 0.3px solid lightgray;
  border-radius: 10px;
  outline: none;
  &:focus {
    border: 0.3px solid lightblue;
  }
  @media (max-width: 600px) {
    width: 285px;
  }
`;

const CountriesWrapper = styled.div`
  min-height: 100vh;
  width: 80%;
  margin: 2em auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4em;
  justify-items: center;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Home = ({ theme }) => {
  const [region, setRegion] = useState("Europe");
  const [countries, setCountries] = useState([]);
  const [searchTerm, setShearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSelect = (e) => {
    setRegion(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const foundCountry = allCountries.find(
      ({ name }) => name.toLowerCase() === searchTerm
    );
    if (foundCountry) {
      history.push(`/${foundCountry.name}`);
    } else {
      setError("Invalid country name...");
    }
  };

  useEffect(() => {
    let active = true;
    const baseUrl = "https://restcountries.eu/rest/v2";

    const getRegionCountries = async () => {
      const allCountries = await fetch(`${baseUrl}/region/${region}`);
      const res = await allCountries.json();
      if (active) {
        setCountries(res);
      }
    };
    getRegionCountries();

    return () => {
      active = false;
    };
  }, [region]);

  useEffect(() => {
    let active = true;
    const baseUrl = "https://restcountries.eu/rest/v2/all";

    const getAllCountries = async () => {
      const allCountries = await fetch(baseUrl);
      const res = await allCountries.json();
      if (active) {
        setAllCountries(res);
      }
    };
    getAllCountries();

    return () => {
      active = false;
    };
  }, []);

  const displayCard = (countries) => {
    return countries.map((country) => (
      <CountryCard key={country.name} country={country} />
    ));
  };
  return (
    <div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <InputsWrapper>
        <Form>
          <SearchInput
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setShearchTerm(e.target.value)}
          />
          <SearchButton type="submit" onClick={handleSearch}>
            <BiSearch />
          </SearchButton>
        </Form>
        <Select value={region} onChange={handleSelect}>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Select>
      </InputsWrapper>
      <CountriesWrapper>{displayCard(countries)}</CountriesWrapper>
    </div>
  );
};

export default Home;
