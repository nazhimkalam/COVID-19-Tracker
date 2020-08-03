import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';


function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);

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
					<InfoBox title="Corona-virus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
					<InfoBox
						title="Corona-virus recoveries"
						total={countryInfo.recovered}
						cases={countryInfo.todayRecovered}
					/>
					<InfoBox title="Corona-virus deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
				</div>

				<Map />
				{/* Map */}
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live cases by country</h3>
					<Table countries={tableData} />
					{/* Graph */}
					<h3>worldwide new cases</h3>
					<LineGraph />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
