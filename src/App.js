import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState('cases');

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		// async --> send a request, wait for it, do something with the information
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json()) // converting the json string into a json data format
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country, // we get the value of the "country" data from the JSON data fetched
						value: country.countryInfo.iso2, // we get the value of the "countryInfo.iso2" data from the JSON data fetched
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
					setMapCountries(data);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const CountryCode = event.target.value;

		const url =
			CountryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${CountryCode}`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(CountryCode);
				setCountryInfo(data);
				console.log(data);
				if (CountryCode === 'worldwide') {
					setMapCenter([34.80746, -40.4796]);
					setMapZoom(3);
				} else {
					setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
					setMapZoom(4);
				}
			});
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" value={country} onChange={onCountryChange}>
							<MenuItem value="worldwide">WorldWide</MenuItem>
							{countries.map((countryData) => (
								<MenuItem value={countryData.value}>{countryData.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox
						color="red"
						active={casesType === 'cases'}
						onClick={(event) => setCasesType('cases')}
						title="Corona-virus cases"
						total={prettyPrintStat(countryInfo.cases)}
						cases={prettyPrintStat(countryInfo.todayCases)}
					/>
					<InfoBox
						color="green"
						active={casesType === 'recovered'}
						onClick={(event) => setCasesType('recovered')}
						title="Corona-virus recoveries"
						total={prettyPrintStat(countryInfo.recovered)}
						cases={prettyPrintStat(countryInfo.todayRecovered)}
					/>
					<InfoBox
						color="blue"
						active={casesType === 'deaths'}
						onClick={(event) => setCasesType('deaths')}
						title="Corona-virus deaths"
						total={prettyPrintStat(countryInfo.deaths)}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
					/>
				</div>

				<Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries} />
			</div>

			<Card className = "app__rightCard">
				<CardContent>
					<div className="app__right">
						<div className="app__table">
							<h3>Live cases by country</h3>
							<Table countries={tableData} />
						</div>
						<div className="app__graph">
							<h3>WorldWide new {casesType}</h3>
							<LineGraph casesType={casesType} />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
