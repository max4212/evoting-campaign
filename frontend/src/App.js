import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import Login from './components/Login/Login';
import FooterComponent from './components/FooterComponent';
import ListUserComponentFunctional from './components/ListUserComponentFunctional';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ListCampaignComponentFunctional from './components/ListCampaignComponentFunctional';
import NewCampaignForm from './components/NewCampaignForm/NewCampaignForm';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';
import { useSelector } from 'react-redux';
import ModifyCampaign from './components/NewCampaignForm/ModifyCampaignForm';
import Voterpage from './components/TestView/Voterpage';
import AdminPage from './components/TestView/Adminpage';
import Header from './components/Header';

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
            {isuserlogin&&<Route path="/users" element={<ListUserComponentFunctional/>}></Route>}
            {isuserlogin&&<Route path="/add-user/:id" element={<CreateUserComponent/>}></Route>}
            {isuserlogin&&<Route path="/view-user/:id" element={<ViewUserComponent/>}></Route>}
            {isuserlogin&&<Route path="/update-user/:id" element={<UpdateUserComponent/>}></Route>}
            {isuserlogin&&<Route path="/campaigns" element={<ListCampaignComponentFunctional />}></Route>}
            {isuserlogin&&<Route path="/AdminPage" element={<ListUserComponentFunctional/>}></Route>}
            {isuserlogin&&<Route path="/Voterpage" element={<Voterpage></Voterpage>}></Route>}
            {isuserlogin&&<Route path="newCampaignForm" element={<NewCampaignForm/>}></Route>}
            {isuserlogin&&<Route path='campaignDetails' element={<CampaignDetails/>}></Route>}
            {isuserlogin&&<Route path='campaignModify' element={<ModifyCampaign/>}></Route>}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;