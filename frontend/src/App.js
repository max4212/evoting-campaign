import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'

import Login from './components/Login/Login';
import Header from './components/Header';

import ListUserComponentFunctional from './components/ListUserComponentFunctional';
import NewUserForm from './components/NewUserForm/NewUserForm';
import UserDetails from './components/UserDetails/UserDetails';
import ModifyUser from './components/NewUserForm/ModifyUserForm';

import ListCampaignComponentFunctional from './components/ListCampaignComponentFunctional';
import NewCampaignForm from './components/NewCampaignForm/NewCampaignForm';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';
import { useSelector } from 'react-redux';
import ModifyCampaign from './components/NewCampaignForm/ModifyCampaignForm';

import VoterListComponentFunctional from './components/VoterListComponentFunctional';
import Resultpage from './components/Resultpage';
import Optionpage from './components/Optionpage';
import ResultComponent from './components/ResultComponent';
import VoteComponent from './components/VoteComponent';
import VoterListComponent from './components/VoterListComponent';
import View from './components/View';
function App() {
  const isLogin = useSelector((state)=>state.user.authenticated);
  const isuserlogin = localStorage.getItem("inputValue");
  const campaign = localStorage.getItem("campaign");
  return (
    <div>
      <Router>
      <Header></Header>
          <div className="container content-center">
            <Routes> 
            <Route path="/" element={<Login/>}></Route>

            {isuserlogin&&<Route path="/users" element={<ListUserComponentFunctional />}></Route>}
            {isuserlogin&&<Route path="newUserForm" element={<NewUserForm/>}></Route>}
            {isuserlogin&&<Route path='userDetails' element={<UserDetails/>}></Route>}
            {isuserlogin&&<Route path='userModify' element={<ModifyUser/>}></Route>}

            {isuserlogin&&<Route path="/campaigns" element={<ListCampaignComponentFunctional />}></Route>}
            {isuserlogin&&<Route path="newCampaignForm" element={<NewCampaignForm/>}></Route>}
            {isuserlogin&&<Route path='campaignDetails' element={<CampaignDetails/>}></Route>}
            {isuserlogin&&<Route path='campaignModify' element={<ModifyCampaign/>}></Route>}

            {isuserlogin&&<Route path="/voters" element={<VoterListComponentFunctional/>}></Route>}
            {isuserlogin&&<Route path="/Resultpage" element={<Resultpage/>}></Route>}
            {isuserlogin&&campaign&&<Route path = "result" element = {<ResultComponent/>}></Route>}
            {isuserlogin&&<Route path="/Optionpage" element={<Optionpage/>}></Route>}
            {isuserlogin&&campaign&&<Route path = "voteComponent" element = {<VoteComponent/>}></Route>} 
            {isuserlogin&&<Route path = 'View' element = {<View/>}></Route>}      
            </Routes>
          </div>
        </Router>
    </div>
    
  );
}

export default App;