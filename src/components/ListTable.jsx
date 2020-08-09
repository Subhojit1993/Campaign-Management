import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import '../App.css';
import { MockData } from './MockData';
import { deleteTracker } from "../actions/trackerActions";
import { connect } from "react-redux";
// icons import
import WhiteDigital from "../icons/white_phone.png";
import WhiteOutOfHome from "../icons/white_poster.png";
import WhiteTvIcon from "../icons/white_monitor.png";
import WhiteRadio from "../icons/white_radio.png";
import RemoveIcon from "../icons/delete.png";
// popup add with button
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// included react router
import { withRouter } from 'react-router-dom';
// channels declarations
const OUT_OF_HOME = 'Out of Home';
const TV = 'TV';
const RADIO = 'Radio';

export const ListTable = (props) => {
	const { trackers, containerClass } = props;
	const [listAction, setListAction] = useState({ popOpen: false, setId: null });
	const removeClick = (e, data) => {
		setListAction((prevState) => ({
			...prevState,
			setId: data.id,
			popOpen: true
		}));
	}
	const handleRemove = () => {
		let setId = listAction.setId;
		setListAction((prevState) => ({
			...prevState,
			setId: null,
			popOpen: false
		}));
		props.deleteTracker(setId);
	}
	const handleClose = () => {
		setListAction((prevState) => ({
			...prevState,
			popOpen: false
		}));
	}
	let trackersList = (
		<div className="customizedMsgs">
			Loading..
		</div>
	);
	if(trackers.length > 0)
		trackersList = trackers.map((tracker) => {
			let channelTypes = '';
			let trackerOptions = '';
			let isIcon = WhiteDigital;
			MockData.channels.map(channel => {
				if(channel.id === tracker.channel){
					if(channel.text === OUT_OF_HOME)
						isIcon = WhiteOutOfHome;
					if(channel.text === TV)
						isIcon = WhiteTvIcon;
					if(channel.text === RADIO)
						isIcon = WhiteRadio;
				}
			})
			tracker.channelTypes.map((types, index) => {
				MockData.channelTypes.map(channel => {
					if(channel.id === types){
						if(index > 1)
							channelTypes = channelTypes + ', ' + channel.text;
						else
							channelTypes = channel.text;
					}
				})
			});
			tracker.TrackingOptions.map((option, index) => {
				MockData.trackingOptions.map(trackOption => {
					if(trackOption.id === option) {
						if(index > 1)
							trackerOptions = trackerOptions + ', ' + trackOption.text;
						else
							trackerOptions = trackOption.text;
					}
				})
			})
			return(
				<TableRow key={tracker.id}>
					   <TableRowColumn className="rowCol_Class">
					   		<div>
						   		<div className="icons_outer customizedChannel channelMargin mobile_icon_outer">
						   			<img 
										src={isIcon}
										className={"list_img_icon_size"}
									/>
						   		</div>
					   		</div>
					   </TableRowColumn>
					   <TableRowColumn className="rowCol_content">
					   		<div>
					   			<div>
							   		<h3 className="textFont fontSize17">{tracker.campaignName}</h3>
						   		</div>
						   		<div>
						   			<div className="displayInline_block">
								   		<h3 className="textFont custom_width">Types:</h3>
								   		<p className="textFont">{channelTypes}</p>
							   		</div>
							   		<div className="displayInline_block">
								   		<h3 className="textFont">Tracking Options:</h3>
								   		<p className="textFont">{trackerOptions}</p>
							   		</div>
						   		</div>
						   		<div>
						   			<div className="displayInline_block">
								   		<h3 className="textFont custom_width">From:</h3>
								   		<p className="textFont">{tracker.startDate}</p>
							   		</div>
							   		<div className="displayInline_block">
								   		<h3 className="textFont">To:</h3>
								   		<p className="textFont">{tracker.endDate}</p>
							   		</div>
						   		</div>
						   		<div>
						   			<div className="displayInline_block">
								   		<h3 className="textFont custom_width">Total Budget:</h3>
								   		<p className="textFont">{tracker.totalBudget}</p>
							   		</div>
							   		<div className="displayInline_block">
								   		<h3 className="textFont">Total Impression:</h3>
								   		<p className="textFont">{tracker.totalImpression}</p>
							   		</div>
						   		</div>
					   		</div>
					   </TableRowColumn>
					   <TableRowColumn>
					   		<div>
					   			<img
					   				src={RemoveIcon}
					   				className="customizedRemove"
					   				onClick={(e) => removeClick(e, tracker)}
					   			/>
					   		</div>
					   </TableRowColumn>
				</TableRow>
			);
		});
	if(trackers.length === 0)
		trackersList = (
			<div className="customizedMsgs">
				List is Empty!
			</div>
		);
	const actions = [
      <FlatButton
        label="Yes"
        primary={true}
        onClick={handleRemove}
        className="admin_dialogbuttonClass"
      />,
      <FlatButton
        label="No"
        primary={true}
        onClick={handleClose}
        className="admin_dialogbuttonClass"
      />,
    ];
    let popOpen = false;
    if(listAction && listAction.popOpen)
    	popOpen = listAction.popOpen;
	return(
		<div className={containerClass}>
			<div>
				<Table>
					<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					  <TableRow>
					    <TableHeaderColumn>Trackers</TableHeaderColumn>
					  </TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
					  {trackersList}
					</TableBody>
				</Table>
			</div>
			<Dialog
	          actions={actions}
	          modal={true}
	          open={popOpen}
	          onRequestClose={handleClose}
	        >
	          Are you sure, you want to remove the product?
	        </Dialog>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTracker: (setId) => {
      dispatch(deleteTracker(setId))
    }
  };
}

export const ListTableWithRedux = withRouter(connect(null, mapDispatchToProps)(ListTable));