import React, { useState, useEffect } from 'react';
import { StepTrackers } from './StepTrackers';
const START = 'start';
const END = 'end';
const format = 'dd-mm-yyyy';

export const FlightSection = (props) => {
	const { isTab, handleNextClick, handlePrevClick, dataAction } = props;
	const obj = { startDate: format, endDate: format };
	const errorMsgs = { e_start_date: '', e_end_date: '' };
	const [flightAction, setFlightAction] = useState({ obj, errorMsgs });
	// lifecycle
	useEffect(() => {
		let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
		if(getDataCache && getDataCache.dateObj)
			setFlightAction((prevState) => ({
				...prevState,
				obj: {...getDataCache.dateObj}
			}));
		if(dataAction.startDate !== '' && dataAction.endDate !== '')
			setFlightAction((prevState) => ({
				...prevState,
				obj: {
					startDate: dataAction.startDate,
					endDate: dataAction.endDate
				}
			}))

	}, [])
	// form submit
	const handleFormSubmit = (e, data) => {
		let e_start_date = '', e_end_date = '';
		if(data.startDate !== format && data.endDate !== format) {
			let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
			if(!getDataCache.dateObj || (getDataCache.dateObj && JSON.stringify(getDataCache.dateObj) !== JSON.stringify(data))){
				getDataCache.dateObj = {...data};
				let objToString = JSON.stringify(getDataCache);
				localStorage.setItem('dataCache', objToString);
			}
			handleNextClick(isTab, data);
		}
		else {
			if(data.startDate === format)
				e_start_date = "* start date is required!";
			if(data.endDate === format)
				e_end_date = "* end date is required!";
		}
		setFlightAction((prevState) => ({
			...prevState,
			errorMsgs: {...prevState.errorMsgs, e_start_date, e_end_date}
		}));
	}
	// set data values
	const handleDateValues = (e, type) => {
		let val = e.target.value;
		if(type === START)
			setFlightAction((prevState) => ({
				...prevState,
				obj: {...prevState.obj, startDate: val }
			}));
		if(type === END)
			setFlightAction((prevState) => ({
				...prevState,
				obj: {...prevState.obj, endDate: val }
			}));
		// validations
		let e_start_date = '';
		let e_end_date = '';
		if(val === format && type === START)
			e_start_date = "* start date is required!";
		if(val === format && type === END)
			e_end_date = "* end date is required!";
		setFlightAction((prevState) => ({
			...prevState,
			errorMsgs: {...prevState.errorMsgs, e_start_date, e_end_date}
		}));
	}
	return(
		<div className="dateOuter_flex">
			<div className="displayInline_block dateInput_outer">
				<h3>Start</h3>
				<input
					type="date"
					className="customizedDate_section"
					onChange={(e) => handleDateValues(e, START)}
					value={flightAction.obj.startDate}
				/>
				<h3 className="customizedErrors errorTexts">{flightAction.errorMsgs.e_start_date}</h3>
			</div>
			<div className="displayInline_block dateInput_outer">
				<h3>End</h3>
				<input
					type="date"
					className="customizedDate_section"
					onChange={(e) => handleDateValues(e, END)}
					value={flightAction.obj.endDate}
				/>
				<h3 className="customizedErrors errorTexts">{flightAction.errorMsgs.e_end_date}</h3>
			</div>
			<div className="FlightSection_buttonOuter">
				<StepTrackers
					isTab={isTab}
					data={flightAction.obj}
					handleFormSubmit={handleFormSubmit}
					handlePrevClick={handlePrevClick} 
				/>
			</div>
		</div>
	)
}