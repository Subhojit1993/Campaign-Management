import React from 'react';
import { Link } from 'react-router-dom';
const CREATE = 'create';

export const TabSection = () => {
	let urlArr = window.location.href.split('/');
	let tab1_border = '';
	let tab2_border = '';
	if(urlArr[3] && urlArr[3] === CREATE)
		tab2_border = ' borderBottom';
	else
		tab1_border = ' borderBottom';
	return(
		<div className={'paddingLeft_13'}>
			<Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
				<div className={'subHeader_tabs' + tab1_border}>
					List
				</div>
			</Link>
			<Link to="/create" style={{ textDecoration: "none", color: "#FFFFFF" }}>
				<div className={'subHeader_tabs' + tab2_border}>
					Create
				</div>
			</Link>
		</div>
	);
}