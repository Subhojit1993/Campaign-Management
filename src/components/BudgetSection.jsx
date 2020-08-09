import React, { useState, useEffect } from 'react';
import { StepTrackers } from './StepTrackers';
const TOTAL_BUDGET = 'total_budget';
const TOTAL_IMPRESSION = 'total_impression';

export const BudgetSection = (props) => {
	const { isTab, handleNextClick, handlePrevClick, dataAction } = props;
	const obj = { totalBudget: '', totalImpression: '' };
	const errorMsgs = { error_budget: '', error_impression: '' };
	const [budgetAction, setBudgetAction] = useState({ obj, errorMsgs });
	useEffect(() => {
		let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
		if(getDataCache && getDataCache.budget)
			setBudgetAction((prevState) => ({
				...prevState,
				obj: {...getDataCache.budget}
			}));
		if(dataAction.totalBudget !== '' && dataAction.totalImpression !== '')
			setBudgetAction((prevState) => ({
				...prevState,
				obj: {
					totalBudget: dataAction.totalBudget,
					totalImpression: dataAction.totalImpression
				}
			}))
	}, [])
	const handleFormSubmit = (e, data) => {
		let error_budget = '', error_impression = '';
		if(budgetAction.obj.totalBudget !== '' && budgetAction.obj.totalImpression !== '') {
			let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
			getDataCache.budget = {...data};
			let objToString = JSON.stringify(getDataCache);
			localStorage.setItem('dataCache', objToString);
			handleNextClick(isTab, budgetAction.obj);
		}
		else {
			if(data.totalBudget === '')
				error_budget = "* start date is required!";
			if(data.totalImpression === '')
				error_impression = "* end date is required!";
		}
		setBudgetAction((prevState) => ({
			...prevState,
			errorMsgs: {...prevState.errorMsgs, error_budget, error_impression}
		}));
	}
	const handleBudget = (e, type) => {
		let val = e.target.value;
		if(type === TOTAL_BUDGET)
			setBudgetAction((prevState) => ({
				...prevState,
				obj: {...prevState.obj, totalBudget: val }
			}));
		if(type === TOTAL_IMPRESSION)
			setBudgetAction((prevState) => ({
				...prevState,
				obj: {...prevState.obj, totalImpression: val }
			}));
		// validations
		let error_budget = '';
		let error_impression = '';
		if(val === '' && type === TOTAL_BUDGET)
			error_budget = "* total budget is required!";
		if(val === '' && type === TOTAL_IMPRESSION)
			error_impression = "* total impression is required!";
		setBudgetAction((prevState) => ({
			...prevState,
			errorMsgs: {...prevState.errorMsgs, error_budget, error_impression}
		}));
	}
	return(
		<div className="dateOuter_flex">
			<div className="displayInline_block budget_outer">
				<h3>Total Budget</h3>
				<input
					type="text"
					placeholder="Enter budget"
					className="customizedTextBox"
					onChange={(e) => handleBudget(e, TOTAL_BUDGET)}
					value={budgetAction.obj.totalBudget}
				/>
				<h3 className="customizedErrors errorTexts">{budgetAction.errorMsgs.error_budget}</h3>
			</div>
			<div className="displayInline_block budget_outer">
				<h3>Total Impressions</h3>
				<input
					type="text"
					placeholder="Enter impression"
					className="customizedTextBox"
					onChange={(e) => handleBudget(e, TOTAL_IMPRESSION)}
					value={budgetAction.obj.totalImpression}
				/>
				<h3 className="customizedErrors errorTexts">{budgetAction.errorMsgs.error_impression}</h3>
			</div>
			<div className="FlightSection_buttonOuter">
				<StepTrackers
					isTab={isTab}
					data={budgetAction.obj}
					handleFormSubmit={handleFormSubmit}
					handlePrevClick={handlePrevClick}
					dataAction={dataAction} 
				/>
			</div>
		</div>
	)
}