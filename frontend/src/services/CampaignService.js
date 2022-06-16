import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"
const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/v1/campaigns";

class CampaignService {

    getCampaigns(){
        return axios.get(CAMPAIGN_API_BASE_URL);
    }

    getCampaignsByUser(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId + '/campaigns');
    }

    createCampaign(userId, campaign){
        return axios.post(USER_API_BASE_URL + '/' + userId + '/campaigns', campaign);
    }

    getCampaignById(campaignId){
        return axios.get(CAMPAIGN_API_BASE_URL + '/' + campaignId);
    }

    getAllOpen(){
        return axios.get(CAMPAIGN_API_BASE_URL + '/findByCampaignStatus/Open');
    }

    getAllClosed(){
        return axios.get(CAMPAIGN_API_BASE_URL + '/findByCampaignStatus/Closed');
    }

    updateCampaign(campaign, campaignId){
        return axios.put(CAMPAIGN_API_BASE_URL + '/' + campaignId, campaign);
    }

    deleteCampaign(campaignId){
        return axios.delete(CAMPAIGN_API_BASE_URL + '/' + campaignId);
    }
}

export default new CampaignService()