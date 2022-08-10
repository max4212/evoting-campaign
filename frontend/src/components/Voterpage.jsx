import React from 'react'
import {useNavigate} from 'react-router-dom'
import VoterListComponent from './VoterListComponent';

export default function ListCampaignComponentFunctional(props) {
    const navigate = useNavigate();
    return <VoterListComponent {...props} navigate={navigate}/>
}
