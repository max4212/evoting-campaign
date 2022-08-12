import { useEffect } from "react";
import { useState } from "react";
import React, { useLocation, useNavigate } from "react-router-dom";
import CampaignService from "../../services/CampaignService";

export default function CampaignDetails() {
  const [voterUser,setVoterUser] = useState([]); 
  const location = useLocation();
  const navigate = useNavigate();

  const {id,campaignName,campaignStatus,deadline,options,voters}=location.state.campaign;
  const [readOnly, setReadOnly] = useState(true);
  
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await CampaignService.getVoterByCampaign(id);
      console.log(data.data);
      setVoterUser(data.data);
    }
    fetchData();
  },[])

  console.log(voters);
  

//   const campaignId = location.state.campaignId;
//   const campaignName = campaigns.find(
//     (campaign) => campaign.id === campaignId
//   ).campaignName;
//   const campaignDetails = campaigns.find(
//     (campaign) => campaign.id === campaignId
//   ).campaignDetails;
//   const options = campaigns.find(
//     (campaign) => campaign.id === campaignId
//   ).options;
//   const deadline = campaigns.find(
//     (campaign) => campaign.id === campaignId
//   ).deadline;
//   const voters = campaigns.find(
//     (campaign) => campaign.id === campaignId
//   ).voters;
//   console.log(voters);

  const dataChangeHandler = (event) => {
    if (event.target.id === "backBtn") {
      navigate("/campaigns");
    } else if (event.target.id === "modifyBtn") {
      navigate("/campaignModify", {
        state: {
          id,
          campaignName,
          campaignStatus,
          options,
          voters:voterUser,
          deadline,
          usagePurpose: "modify",
        },
      });
    } 
  };


  return (
    <div className="p-1 my-1">
      <div className="flex align-middle justify-end gap-x-1">
        <button
          className="btn btn-info"
          id="modifyBtn"
          onClick={dataChangeHandler}
          disabled={campaignStatus!=="Open"}
        >
          Modify
        </button>
        <button
          className="btn btn-danger"
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
