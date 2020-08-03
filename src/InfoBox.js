import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox({ title, cases, active, color, total, ...props }) {
	return (
		<Card onClick={props.onClick} className={`infoBox ${active && `infoBox--${color}`}`}>
			<CardContent>
				<Typography color="textSecondary" className="infoBox__title">
					{title}
				</Typography>

				<h2 className={`infoBox__cases ${`infoBox--case--${color}`}`}>{cases}</h2>

				<Typography color="textSecondary" className="infoBox__total">
					{total} Total
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
