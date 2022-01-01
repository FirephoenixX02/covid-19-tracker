import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyStats } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, // USA, UK etc.
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // All of the data from the country response
        setCountryInfo(data);
        //Set Map Center
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(6);
      });
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
            title="Cases"
            cases={prettyStats(countryInfo.todayCases)}
            total={prettyStats(countryInfo.cases)}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            cases={prettyStats(countryInfo.todayRecovered)}
            total={prettyStats(countryInfo.recovered)}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            cases={prettyStats(countryInfo.todayDeaths)}
            total={prettyStats(countryInfo.deaths)}
          ></InfoBox>
        </div>
        {/* Map */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        ></Map>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData}></Table>
          <h3>Worldwide new Cases</h3>
          {/* Graph */}
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
