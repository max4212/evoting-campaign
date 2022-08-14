import React from 'react'
import {useNavigate} from 'react-router-dom'
import VoteComponent from './VoteComponent';

export default function ListCampaignComponentFunctional(props) {
    const navigate = useNavigate();
    return <VoteComponent {...props} navigate={navigate}/>
}
