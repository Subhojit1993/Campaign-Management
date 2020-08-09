import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTrackers } from "./actions/trackerActions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Header } from './components/Header';
import { CreateFormWithRedux } from './components/CreateForm';
import { ListTableWithRedux } from './components/ListTable';
import { TabSection } from './components/TabSection';
import { MyNote } from './components/MyNote';
import './App.css';
// react router included
import { Switch, Route, withRouter } from 'react-router-dom';
// note declaration
const NOTE = 'note';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTrackers());
  }
  render() {
    let container = 'admin_content_class';
    let tabSec = (
      <div>
        <TabSection />
      </div>
    );
    let urlArr = window.location.href.split('/');
    if(urlArr[3] && urlArr[3] === NOTE)
      tabSec = '';
    if(window.innerWidth < 767)
      container = '';
    const { trackers } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <div className="App">
            <Header />
          </div>
          {tabSec}
          <Switch>
            <Route exact path="/">
              <ListTableWithRedux containerClass={container} trackers={trackers} />
            </Route>
            <Route exact path="/note">
              <MyNote containerClass={container} />
            </Route>
            <Route exact path="/create">
              <CreateFormWithRedux containerClass={container} />
            </Route>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  trackers: state.trackers.items,
  loading: state.trackers.loading,
  error: state.trackers.error
});

export default withRouter(connect(mapStateToProps)(App));
