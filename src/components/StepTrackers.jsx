import React from 'react';
// steps declaration
const FLIGHT = 'flight';
const BUDGET = 'budget';

export const StepTrackers = (props) => {
	const { handleFormSubmit, data, isTab, handlePrevClick, dataAction } = props;
	let isPrevious = '';
	if(isTab === FLIGHT || isTab === BUDGET)
		isPrevious = (
			<div className="displayInline_block">
				<button
					type="button"
					className="customized_stepButtons"
					onClick={(e) => handlePrevClick(e, isTab)}
				>
					Previous
				</button>
			</div>
		);
	let buttonText = "Next  >";
	if(isTab === BUDGET)
		buttonText = "Create Tracker";
	let getData = {...data};
	if(dataAction && dataAction.campaignName && dataAction.campaignName !== '')
		getData = {...data, campaignName: dataAction.campaignName };
	return(
		<div className="stepTrackers_rightPadding">
			{isPrevious}
			<div className={'displayInline_block RightButton_align'}>
				<button
					type="submit"
					className="customized_stepButtons"
					onClick={(e) => handleFormSubmit(e, getData)}
				>
					{buttonText}
				</button>
			</div>
		</div>
	)
}