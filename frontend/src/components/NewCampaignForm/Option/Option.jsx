import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Option(props) {
    const dataChangeHandler = (event) => {
        if (event.target.name === 'optionName') {
            props.setOptionNameHandler({id: props.id, optionName: event.target.value});
        }
        else if(event.target.name === 'deleteOption') {
            props.deleteOptionHandler(props.id)
        }
    }
    return (
        <div className='card' id={props.id}>
            <h5 class="card-header text-center">Option {props.id}</h5>
            <div className="card-body flex flex-col gap-y-1">
                <input onChange={dataChangeHandler} type="text" placeholder='Option Name' name='optionName' className="form-control" id={props.id} value={props.optionName} />
                <button name='deleteOption' onClick={dataChangeHandler} type='button' className="btn btn-danger btn-block"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    )
}
