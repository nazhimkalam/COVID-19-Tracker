import React from 'react';
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';

function App() {
	return (
		<div className="App">
			<h1>COVID-19 TRACKER</h1>
			<FormControl className="app__dropdown">
				<Select variant="outlined" value="abc">
					<MenuItem value="worldwide">WorldWide</MenuItem>
					<MenuItem value="worldwide">WorldWide</MenuItem>
					<MenuItem value="worldwide">WorldWide</MenuItem>
					<MenuItem value="worldwide">WorldWide</MenuItem>
				</Select>
			</FormControl>

			{/* Header */}
			{/* Title + Select input dropdown field */}

			{/* InfoBox */}
			{/* InfoBox */}
			{/* InfoBox */}

			{/* Table */}
			{/* Graph */}

			{/* Map */}
		</div>
	);
}

export default App;
