import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const ImgWrapper = styled.div`
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardDetails = styled.div`
  padding: 1.2em 1em;
  h2 {
    margin-bottom: 1em;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
`;

const CountryCard = (props) => {
  const { flag, name, population, region, capital } = props.country;
  const slug = slugify(name, { delimiter: " " });
  return (
    <Card>
      <ImgWrapper>
        <img src={`${flag}`} alt={name} />
      </ImgWrapper>
      <CardDetails>
        <h2>
          {" "}
          <Link to={`/${slug}`}>{name}</Link>
        </h2>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
      </CardDetails>
    </Card>
  );
};

export default CountryCard;
