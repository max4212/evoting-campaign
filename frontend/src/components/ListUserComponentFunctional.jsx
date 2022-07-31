import React from 'react'
import {useNavigate} from 'react-router-dom'
import ListUserComponent from "./ListUserComponent";

export default function ListUserComponentFunctional(props) {
    const navigate = useNavigate();
    return <ListUserComponent {...props} navigate={navigate}/>
}
