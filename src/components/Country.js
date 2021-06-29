import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

import Loading from "./Loading";

const CountryWrapper = styled.section`
  width: 80%;
  margin: 5em auto;
  a {
    text-decoration: none;
    color: black;
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 0.2em 1.4em;
  font-size: 1.1em;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 4em;
  color: ${({ theme }) => theme.text};
  &:focus {
    border: 0.3px solid lightblue;
  }
  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  }
`;

const CountryDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CountryImg = styled.div`
  width: 40%;
  img {
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 3em;
  }
`;

const CountryInfo = styled.div`
  padding: 0 3em;
  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0;
  }
`;

const BaseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
  line-height: 2em;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Borders = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CountryButton = styled.button`
  margin: 0.2em;
  background: none;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 0.2em 1em;
  font-size: 1.1em;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:focus {
    border: 0.3px solid lightblue;
  }
  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
  }
`;

const Country = (props) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState({});

  useEffect(() => {
    let active = true;
    const name = props.match.params.country;

    const getCountry = async () => {
      const baseUrl = `https://restcountries.eu/rest/v2/name`;
      const country = await fetch(`${baseUrl}/${name}?fullText=true`);
      const res = await country.json();
      if (active) {
        setLoading(false);
        setCountry(res[0]);
      }
    };
    getCountry();
    return () => {
      active = false;
    };
  }, [props.match.params.country]);

  if (loading) {
    return <Loading />;
  }
  return (
    <CountryWrapper>
      <Link to="/">
        <Button>
          {" "}
          <BsArrowLeft style={{ marginRight: "0.5em" }} />
          Back
        </Button>
      </Link>
      <CountryDetails>
        <CountryImg>
          <img src={`${country.flag}`} alt={country.name} />
        </CountryImg>
        <CountryInfo>
          <h1>{country.name}</h1>
          <BaseInfo>
            <div className="left-details">
              <p>
                <strong>Native Name:</strong> {country.nativeName}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subRegion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            </div>
            <div className="right-details">
              <p>
                <strong>Top Level Domain:</strong> {country.topLevelDomain}
              </p>
              <p>
                <strong>Currencies: </strong>
                {country.currencies &&
                  country.currencies.map((currency) =>
                    country.currencies.length === 1 ? (
                      <span key={currency.name}>{currency.name}</span>
                    ) : (
                      <span key={currency.name}>{currency.name}, </span>
                    )
                  )}
              </p>
              <p>
                <strong>Languages: </strong>
                {country.languages &&
                  country.languages.map((language) =>
                    country.languages.length === 1 ? (
                      <span key={language.name}>{language.name}</span>
                    ) : (
                      <span key={language.name}>{language.name}, </span>
                    )
                  )}
              </p>
            </div>
          </BaseInfo>
          <Borders>
            <div>
              <strong style={{ display: "inline" }}>Border Countries: </strong>
            </div>
            <div style={{ display: "flex" }}>
              {country.borders &&
                country.borders.map((border) => (
                  <CountryButton key={border}>{border} </CountryButton>
                ))}
            </div>
          </Borders>
        </CountryInfo>
      </CountryDetails>
    </CountryWrapper>
  );
};

export default Country;
