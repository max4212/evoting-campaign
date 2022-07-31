import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Voter(props) {
  const dataChangeHandler = (event) => {
    if (event.target.name === "removeVoter") {
      // console.log(`removing ${props.id}`);
      props.removeVoterHandler(props.id);
    }
  };
  return (
    <div className="card" id={props.id}>
      <h5 class="card-header text-center">Voter {props.id}</h5>
      <div className="card-body flex flex-col gap-y-1">
        <input
          type="text"
          placeholder="Voter Name"
          name="voterName"
          className="form-control"
          id={props.id}
          value={props.userName}
        />
        <button
          name="removeVoter"
          onClick={dataChangeHandler}
          type="button"
          className="btn btn-danger btn-block"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
