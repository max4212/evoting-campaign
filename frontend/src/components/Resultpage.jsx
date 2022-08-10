import React from 'react'
import {useNavigate} from 'react-router-dom'
import ResultComponent from './ResultComponent';

export default function ListCampaignComponentFunctional(props) {
    const navigate = useNavigate();
    return <ResultComponent {...props} navigate={navigate}/>
}
