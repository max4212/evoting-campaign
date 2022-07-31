import React from 'react'
import {useNavigate} from 'react-router-dom'
import ListCampaignComponent from "./ListCampaignComponent";

export default function ListCampaignComponentFunctional(props) {
    const navigate = useNavigate();
    return <ListCampaignComponent {...props} navigate={navigate}/>
}
