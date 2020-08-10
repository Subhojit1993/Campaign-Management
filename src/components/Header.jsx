import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
const styles = {
  title: {
    cursor: 'pointer',
  },
};
export const Header = (props) => {
	let appBarClass = "admin_appBar_class";
	if(window.innerWidth < 767) {
		appBarClass = "mobile_appbar";
	}
	const appBarOuterClass = appBarClass + ' paddingLeft_13';
	// eslint-disable-next-line
	const appBarLeftClass = appBarClass + '_iconElementLeft' + ' display_Inline';
	// eslint-disable-next-line
	const appBarRightClass = appBarClass + '_iconElementRight' + ' display_Inline';
	return(
		<header className={appBarOuterClass}>
			<div className={appBarLeftClass}>
				<Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
					<span style={styles.title}>Campaign</span>
				</Link>
			</div>
			<div className={appBarRightClass}>
				<Link to="/note" style={{ textDecoration: "none", color: "#FFFFFF" }}>
			   		<div>
			   			<FlatButton 
			   				label="Profile" 
			   				className="admin_noteButton" 
			   			/>
			   		</div>
			   	</Link>
			</div>
		</header>
	);
}