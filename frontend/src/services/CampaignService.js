import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";
const ALL_CAMPAIGN_API_BASE_URL = 'http://localhost:8080/api/users/2/campaigns';
const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/campaigns";

class CampaignService {

    getCampaigns(){
        return axios.get(ALL_CAMPAIGN_API_BASE_URL);
    }

    addCampaign(campaign){
        return axios.post(CAMPAIGN_API_BASE_URL, campaign);
    }

    getCampaignById(id){
        return axios.get(CAMPAIGN_API_BASE_URL + '/' + id);
    }

    editCampaign(campaign, id){
        return axios.put(CAMPAIGN_API_BASE_URL + '/' + id, campaign);
    }

    deleteCampaign(id){
        return axios.delete(CAMPAIGN_API_BASE_URL + '/' + id);
    }
}

export default new CampaignService()