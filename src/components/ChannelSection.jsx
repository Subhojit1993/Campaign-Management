import React, { useState, useEffect } from 'react';
import { MockData } from './MockData';
import { StepTrackers } from './StepTrackers';
import Checkbox from 'material-ui/Checkbox';
// icons import
import Digital from "../icons/phone.png";
import WhiteDigital from "../icons/white_phone.png";
import OutOfHome from "../icons/poster.png";
import WhiteOutOfHome from "../icons/white_poster.png";
import TvIcon from "../icons/monitor.png";
import WhiteTvIcon from "../icons/white_monitor.png";
import Radio from "../icons/radio.png";
import WhiteRadio from "../icons/white_radio.png";
// channels declarations
const OUT_OF_HOME = 'Out of Home';
const TV = 'TV';
const RADIO = 'Radio';
const CHANNEL_TYPES = true;
// checkbox style
const styles = {
  checkbox: {
    marginBottom: 16,
  },
};

export const ChannelSection = (props) => {
	const { isTab, handleNextClick, handlePrevClick, dataAction } = props;
	const errorMsgs = {
		errorChannelTypes: null,
		errorTrackingOptions: null
	};
	const obj = { 
		campaignName: dataAction.campaignName, 
		selectedChannel: 11, 
		selectedTypes: [], 
		selectedTrackers: [] 
	};
	const [channelAction, setChannelAction] = useState({ obj, errorMsgs });
	useEffect(() => {
		let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
		if(getDataCache)
			setChannelAction((prevState) => ({
				...prevState,
				obj: {...getDataCache.channelData}
			}));
	}, [])
	let channels = (
		<div>
			Loading ..
		</div>
	);
	let channelTypes = '';
	let trackingOptions = '';
	const handleChannelClick = (e, selectedChannel) => {
		setChannelAction((prevState) => ({
			...prevState,
			obj: { ...prevState.obj, selectedChannel }
		}));
	}
	const handleFormSubmit = (e, data) => {
		let errorChannelTypes = null;
		let errorTrackingOptions = null;
		if(data.selectedTypes.length > 0 && data.selectedTrackers.length > 0) {
			let getDataCache = JSON.parse(localStorage.getItem('dataCache'));
			let totallyMatched = false;
			if(getDataCache && getDataCache.channelData)
				totallyMatched = JSON.stringify(getDataCache.channelData) === JSON.stringify(data);
			if(!totallyMatched) {
				let channelObj = { channelData: data };
				let objToString = JSON.stringify(channelObj);
				localStorage.setItem('dataCache', objToString);
			}
			handleNextClick(isTab, channelAction.obj);
		}
		else {
			if(data.selectedTypes.length === 0)
				errorChannelTypes = "* Type of Channel is required!"
			if(data.selectedTrackers.length === 0)
				errorTrackingOptions = "* Tracking Option is required!";
		}
		setChannelAction((prevState) => ({
			...prevState,
			errorMsgs: { ...prevState.errorMsgs, errorChannelTypes, errorTrackingOptions }
		}))
	}
	const updateCheck = (e, typeId, type) => {
		let selectedTypes = [...channelAction.obj.selectedTypes];
		let selectedTrackers = [...channelAction.obj.selectedTrackers];
		let typePresent = false;
		let trackerPresent = false;
		let errorChannelTypes = null;
		let errorTrackingOptions = null;
		if(selectedTypes.length > 0){
			for(var j = 0; j < selectedTypes.length; j++){
				if(selectedTypes[j] === typeId){
					selectedTypes.splice(j, 1);
					typePresent = true;
				}
			}
		}
		if(selectedTrackers.length > 0){
			for(var n = 0; n < selectedTrackers.length; n++){
				if(selectedTrackers[n] === typeId){
					selectedTrackers.splice(n, 1);
					trackerPresent = true;
				}
			}
		}
		if(!typePresent && type)
			selectedTypes.push(typeId);
		if(!trackerPresent && !type)
			selectedTrackers.push(typeId);
		if(selectedTypes.length === 0 && type)
			errorChannelTypes = "* Type of Channel is required!";
		if(selectedTrackers.length === 0 && !type)
			errorTrackingOptions = "* Tracking Option is required!";
		setChannelAction((prevState) => ({
			...prevState,
			obj: { ...prevState.obj, selectedTypes, selectedTrackers },
			errorMsgs: { ...prevState.errorMsgs, errorChannelTypes, errorTrackingOptions }
		}));
	}
	if(MockData.channels.length > 0)
		channels = MockData.channels.map(channel => {
			let isIcon = channel.id === channelAction.obj.selectedChannel ? WhiteDigital : Digital;
			let isCustomized = channel.id === channelAction.obj.selectedChannel ? ' customizedChannel' : '';
			if(channel.text === OUT_OF_HOME)
				isIcon = channel.id === channelAction.obj.selectedChannel ? WhiteOutOfHome : OutOfHome;
			else if(channel.text === TV)
				isIcon = channel.id === channelAction.obj.selectedChannel ? WhiteTvIcon : TvIcon;
			else if(channel.text === RADIO)
				isIcon = channel.id === channelAction.obj.selectedChannel ? WhiteRadio : Radio;
			return(
				<div key={channel.id} className={"icons_outer" + isCustomized} onClick={(e) => handleChannelClick(e, channel.id)}>
					<img 
						src={isIcon}
						className={"admin_img_icon_size"}
						alt={channel.text}
					/>
					<h3 className="iconText">
						{channel.text}
					</h3>
				</div>
			);
		})
	else
		channels = (
			<div>
				No channels present
			</div>
		);
	if(MockData.channelTypes.length > 0)
		channelTypes = MockData.channelTypes.map(type => {
			let isChecked = false;
			if(channelAction.obj.selectedTypes.length > 0)
				for(var i = 0; i<channelAction.obj.selectedTypes.length; i++)
					if(channelAction.obj.selectedTypes[i] === type.id)
						isChecked = true;
			return(
				<div key={type.id} className="checkBox_outer">
					<Checkbox
			          label={type.text}
			          checked={isChecked}
			          onCheck={(e) => updateCheck(e, type.id, CHANNEL_TYPES)}
			          style={styles.checkbox}
			          className="customezed_checkBox"
			        />
		        </div>
			);
		})
	if(MockData.trackingOptions.length > 0)
		trackingOptions = MockData.trackingOptions.map(trackers => {
			let isChecked = false;
			if(channelAction.obj.selectedTrackers.length > 0)
				for(var i = 0; i<channelAction.obj.selectedTrackers.length; i++)
					if(channelAction.obj.selectedTrackers[i] === trackers.id)
						isChecked = true;
			return(
				<div key={trackers.id} className="checkBox_outer">
					<Checkbox
			          label={trackers.text}
			          checked={isChecked}
			          onCheck={(e) => updateCheck(e, trackers.id)}
			          style={styles.checkbox}
			          className="customezed_checkBox"
			        />
		        </div>
			);
		})
	return(
		<div>
			<div>
				{channels}
			</div>
			<div className="sectionOuter_spacing">
				<h3>
					Types of Channel
				</h3>
				{channelTypes}
			</div>
			<div className="errorTexts customizedErrors">
				{channelAction.errorMsgs.errorChannelTypes}
			</div>
			<div className="sectionOuter_spacing">
				<h3>
					Tracking Options
				</h3>
				{trackingOptions}
			</div>
			<div className="errorTexts customizedErrors">
				{channelAction.errorMsgs.errorTrackingOptions}
			</div>
			<div className="sectionOuter_spacing">
				<StepTrackers
					isTab={isTab}
					data={channelAction.obj}
					handleFormSubmit={handleFormSubmit}
					handlePrevClick={handlePrevClick}
					dataAction={dataAction} 
				/>
			</div>
		</div>
	)
}