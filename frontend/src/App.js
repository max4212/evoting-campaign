import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CampaignList from './components/CampaignList';
import HostHeader from './components/HostHeader';
import AddCampaign from './components/AddCampaign';
import EditCampaign from './components/EditCampaign';
import ViewCampaign from './components/ViewCampaign';

function App() {
  return (
    <div>
      <Router>
        <HostHeader />
        <div className="container">
          <Switch> 
            <Route path = "/" exact component = {CampaignList}></Route>
            <Route path = "/campaigns" component = {CampaignList}></Route>
            <Route path = "/add-campaigns/:id" component = {AddCampaign}></Route>
            <Route path = "/view-campaigns/:id" component = {ViewCampaign}></Route>
            <Route path = "/edit-campaigns/:id" component = {EditCampaign}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;