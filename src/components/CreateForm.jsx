import React, { useState, useEffect } from 'react';
import TextField from 'material-ui/TextField';
import { createTrackers } from "../actions/trackerActions";
import { connect } from "react-redux";
// react router included
import { withRouter } from 'react-router-dom';
import { TabContents } from './TabContents';
// popup add with button
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// steps declaration
const CHANNEL = 'channel';
const FLIGHT = 'flight';
const BUDGET = 'budget';

export const CreateForm = (props) => {
	const { containerClass, loading, error } = props;
	// formData declaration
	const formData = { 
		campaignName: '',
		channel: null,
		channelTypes: [],
		TrackingOptions: [],
		startDate: '',
		endDate: '',
		totalBudget: '',
		totalImpression: '' 
	};
	const obj = { isTab: 'channel', errorNameText: '', popOpen: false };
	const [dataAction, setDataAction] = useState({...obj, ...formData});
	// tabs border bottom
	let tab1_borderBottom = '';
	let tab2_borderBottom = '';
	let tab3_borderBottom = '';
	let isChannel = false, isFlight = false, isBudget = false;
	useEffect(() => {
		let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
		if(getDataCache)
			setDataAction((prevState) => ({
				...prevState,
				campaignName: getDataCache.channelData.campaignName
			}));
	}, [])
	const handleNextClick = (types, data) => {
		let setTab = types;
		if(types === CHANNEL){
			setTab = FLIGHT;
			setDataAction((prevState) => ({
				...prevState,
				isTab: setTab,
				channel: data.selectedChannel,
				channelTypes: [...data.selectedTypes],
				TrackingOptions: [...data.selectedTrackers]
			}));
		}
		else if(types === FLIGHT){
			setTab = BUDGET;
			setDataAction((prevState) => ({
				...prevState,
				isTab: setTab,
				startDate: data.startDate,
				endDate: data.endDate
			}));
		}
		else if(types === BUDGET){
			if(dataAction.campaignName !== '') {
				let dataObj = {...dataAction,...data};
				handleDataAction(dataObj);
			}
			else {
				setDataAction((prevState) => ({
					...prevState,
					totalBudget: data.totalBudget,
					totalImpression: data.totalImpression,
					errorNameText: '* This field is required!'
				}));
			}
		}
	}
	const handlePrevClick = (e, types) => {
		let setTab = types;
		if(types === FLIGHT)
			setTab = CHANNEL;
		else if(types === BUDGET)
			setTab = FLIGHT;
		setDataAction((prevState) => ({
			...prevState,
			isTab: setTab
		}));
	}
	const handleDataAction = data => {
		let trackerData = JSON.parse(JSON.stringify(data));
		delete trackerData.errorNameText;
		delete trackerData.isTab;
		delete trackerData.popOpen;
		props.createTrackers(trackerData);
    	setDataAction(prevState => ({
			...prevState,
			popOpen: true
		}));
	}
	const handleClose = e => {
		let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
		if(getDataCache)
			localStorage.removeItem('dataCache');
    	setDataAction(() => ({
			...obj, ...formData
		}));
    }
	if(dataAction.isTab === CHANNEL){
		tab1_borderBottom = ' tabs_borderBottom';
		isChannel = true;
	}
	else if(dataAction.isTab === FLIGHT){
		tab2_borderBottom = ' tabs_borderBottom';
		isFlight = true;
	}
	else{
		tab3_borderBottom = ' tabs_borderBottom';
		isBudget = true;
	}
	const handleCampaignName = e => {
		let val = e.target.value;
		let errorNameText = '* This field is required!';
		if(val !== '')
			errorNameText = '';
		setDataAction((prevState) => ({
			...prevState,
			campaignName: val,
			errorNameText
		}));
	}
	const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={handleClose}
        className="admin_dialogbuttonClass"
      />
    ];
    let popOpen = false;
    if(dataAction && dataAction.popOpen)
    	popOpen = dataAction.popOpen;
    let modalText = "Loading ..";
    if(!loading)
    	modalText = "Tracker created successfully!";
    if(error && error !== null && error !== "")
    	modalText = "Network Issue: Failed to create!";
	return(
		<div className={containerClass}>
			<div>
				<div className="campaignText_outer">
					<TextField
				      floatingLabelText="CAMPAIGN NAME"
				      value={dataAction.campaignName}
				      onChange={handleCampaignName}
				    />
				    <h3 className="customizedErrors errorTexts">{dataAction.errorNameText}</h3>
				</div>
				<div className="selectTabs_outer">
					<div 
						className={'selectTabs' + tab1_borderBottom}
					>
						step 1 - select channel
					</div>
					<div 
						className={'selectTabs' + tab2_borderBottom}
					>
						step 2 - flight
					</div>
					<div 
						className={'selectTabs' + tab3_borderBottom}
					>
						step 3 - budget
					</div>
				</div>
				<div className="tabContent_outer">
					<TabContents
						channel={isChannel}
						flight={isFlight}
						budget={isBudget}
						isTab={dataAction.isTab}
						handleNextClick={handleNextClick}
						handlePrevClick={handlePrevClick}
						dataAction={dataAction}
					/>
				</div>
				<Dialog
		          actions={actions}
		          modal={true}
		          open={popOpen}
		          onRequestClose={handleClose}
		        >
		          {modalText}
		        </Dialog>
			</div>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    createTrackers: (dataAction) => {
      dispatch(createTrackers(dataAction))
    }
  };
}

export const CreateFormWithRedux = withRouter(connect(null, mapDispatchToProps)(CreateForm));