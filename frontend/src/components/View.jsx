import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignService from "../services/CampaignService";

export default function View() {
  const [voterUser,setVoterUser] = useState([]); 
  const location = useLocation();
  const navigate = useNavigate();

  const {id,campaignName,campaignStatus,deadline,options,voters}=location.state.campaign;
  const [readOnly, setReadOnly] = useState(true);

  useEffect(()=>{
    const fetchData = async()=>{
      const data = await CampaignService.getVoterByCampaign(id);
      setVoterUser(data.data);
    }
    fetchData();
  },[])  

  const dataChangeHandler = (event) => {
    if (event.target.id === "backBtn") {
      navigate("/voters");
    }
}
  return (
    <div className="p-1 my-1">
      <div className="flex align-middle justify-end gap-x-1">
        <button
          className="btn btn-dark"
          id="backBtn"
          onClick={dataChangeHandler}
        >
          Back
        </button>
      </div>
      <div class="card mt-2">
        <div class="card-header">Campaign Details</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="campaignName" class="form-label">
              Campaign Name
            </label>
            <input
              type="text"
              class="form-control"
              id="campaignName"
              placeholder="Campaign Name"
              readOnly={readOnly}
              value={campaignName}
            />
          </div>
          <div class="mb-3">
            <label for="campaignDetails" class="form-label">
              Campaign Details
            </label>
            <input
              type="text"
              class="form-control"
              id="campaignDetails"
              placeholder="Campaign Details"
              readOnly={readOnly}
              value={campaignStatus}
            />
          </div>
          <div class="mb-3">
            <label for="deadline" class="form-label">
              Deadline
            </label>
            <input
              type="text"
              class="form-control"
              id="deadline"
              placeholder="Deadline"
              readOnly={readOnly}
              value={deadline}
            />
          </div>
          <div class="mb-3">
            <label for="options" class="form-label">
              Campaign Options
            </label>
            <div className="flex flex-col gap-y-1">
              {options.map((option) => (
                <input
                  type="text"
                  class="form-control"
                  id="options"
                  placeholder="Campaign Option"
                  readOnly={readOnly}
                  value={option.optionDesc}
                />
              ))}
            </div>
          </div>
          <div class="mb-3">
            <label for="options" class="form-label">
              Voters
            </label>
            <div className="flex flex-col gap-y-1">
              {voterUser.map((voter) => (
                <input
                  type="text"
                  class="form-control"
                  id="voters"
                  placeholder="Campaign Option"
                  readOnly={readOnly}
                  value={voter.userName}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <div class="card-footer text-muted">
                    2 days ago
                </div> */}
      </div>
    </div>
  );
}
