import React from 'react';
import { ChannelSection } from './ChannelSection';
import { FlightSection } from './FlightSection';
import { BudgetSection } from './BudgetSection';

export const TabContents = (props) => {
	const { channel, flight, budget, isTab, handleNextClick, handlePrevClick, dataAction } = props;
	let isChannel = (
		<div>
			<ChannelSection
				isTab={isTab}
				handleNextClick={handleNextClick}
				handlePrevClick={handlePrevClick} 
				dataAction={dataAction}
			/>
		</div>
	);
	if(flight)
		isChannel = (
			<div className="othersOuter_spacing">
				<FlightSection
					isTab={isTab}
					handleNextClick={handleNextClick}
					handlePrevClick={handlePrevClick} 
					dataAction={dataAction}
				/>
			</div>
		);
	else if(budget)
		isChannel = (
			<div className="othersOuter_spacing">
				<BudgetSection
					isTab={isTab}
					handleNextClick={handleNextClick}
					handlePrevClick={handlePrevClick}
					dataAction={dataAction} 
				/>
			</div>
		);
	return(
		<div>
			{isChannel}
		</div>
	);
}