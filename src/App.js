import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, // USA, UK etc.
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/*Header*/}
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            {/* Title + Select input dropdown field*/}

            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/*Loop through Countries and display dropdown menu*/}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* Info Boxes */}
          <InfoBox
            title="Coronavirus Cases"
            cases={2000}
            total={2000}
          ></InfoBox>
          <InfoBox title="Recovered" cases={3000} total={2000}></InfoBox>
          <InfoBox title="Deaths" cases={4000} total={2000}></InfoBox>
        </div>
        {/* Map */}
        <Map></Map>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
