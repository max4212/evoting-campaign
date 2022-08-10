import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignService from '../services/CampaignService'
import OptionService from '../services/OptionService'
import VoterService from '../services/VoterService'
import ReactApexChart from 'react-apexcharts'

class ResultComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            options:[], series:[], campaign: [], voter: [],
            option: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: [],
                responsive: [{
                  breakpoint: 480,
                  option: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }]
              },
        };
    }
            
    componentDidMount()
    {
        const id = localStorage.getItem("campaign");
        console.log(id)
        CampaignService.getCampaignById(id).then( res => {
            this.setState({campaign: res.data});
        })
        OptionService.getOptionsByCampaign(id).then((response)=>{this.setState({options:response.data})
        });
        VoterService.getVotersByCampaign(id).then( res => {
            this.setState({voter: res.data});
        })
    }

    back(){
        this.props.navigate(-1);
        localStorage.removeItem("campaign");
    }

    array()
    {
        if(this.state.series.length===0)
            for(var i of this.state.options)
            {
                this.state.series.push(i.voteCount)
                this.state.option.labels.push(i.optionDesc)
            }
        }
    render()
    {
        return(    
            <div className="p-1 my-1">
            <div className="flex align-middle justify-end gap-x-1">
              <button
                className="btn btn-danger"
                id="backBtn"
                onClick={this.back.bind(this)}
              >
                Back
              </button>
            </div>
            <div class="card mt-2">
                {this.array()}
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
                        value={this.state.campaign.campaignName}
                        readOnly
                    />
                </div>
                <div class="mb-3">
                    <label for="deadline" class="form-label">
                    Closing Date
                    </label>
                    <input
                    type="text"
                    class="form-control"
                    id="deadline"
                    placeholder="Deadline"
                    value={this.state.campaign.deadline}
                    readOnly
                    />
                </div>
                <div class="mb-3">
                    <label for="options" class="form-label">
                    Options
                    </label>
                    <div className="flex flex-col gap-y-1">
                    {this.state.options.map((option) => (
                        <input
                        type="text"
                        class="form-control"
                        id="options"
                        placeholder="Campaign Option"
                        value={option.optionDesc}
                        readOnly
                        />
                    ))}
                    </div>
                </div>
                              <td id="chart" classname="">
                          {
                              <ReactApexChart options={this.state.option} series={this.state.series} type="pie" width={380} />                                
                          }
                          </td>
                          </div>
              {/* <div class="card-footer text-muted">
                          2 days ago
                      </div> */}
            </div>
          </div>
        )
    }
    
}
export default ResultComponent