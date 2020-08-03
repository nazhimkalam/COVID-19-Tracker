import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, total }) {
	return (
		<Card className="infoBox">
			<CardContent>
                
				{/* title */}
				<Typography color="textSecondary" className="infoBox__title">
					{title}
				</Typography>

				{/* cases */}
				<h2 className="infoBox__cases">{cases}</h2>

				{/* total */}
				<Typography color="textSecondary" className="infoBox__total">
					{total} Total
				</Typography>

			</CardContent>
		</Card>
	);
}

export default InfoBox;
