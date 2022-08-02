import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'

import Login from './components/Login/Login';
import Header from './components/Header';
import FooterComponent from './components/FooterComponent';

import ListUserComponentFunctional from './components/ListUserComponentFunctional';
import NewUserForm from './components/NewUserForm/NewUserForm';
import UserDetails from './components/UserDetails/UserDetails';
import ModifyUser from './components/NewUserForm/ModifyUserForm';

import ListCampaignComponentFunctional from './components/ListCampaignComponentFunctional';
import NewCampaignForm from './components/NewCampaignForm/NewCampaignForm';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';
import { useSelector } from 'react-redux';
import ModifyCampaign from './components/NewCampaignForm/ModifyCampaignForm';

import Voterpage from './components/view/Voterpage';

function App() {

  const isLogin = useSelector((state)=>state.user.authenticated);
  const isuserlogin = localStorage.getItem("inputValue");
  return (
    <div>
      <Router>
        {/* <HeaderComponent /> */}
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

            {isuserlogin&&<Route path="/Voterpage" element={<Voterpage></Voterpage>}></Route>}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;