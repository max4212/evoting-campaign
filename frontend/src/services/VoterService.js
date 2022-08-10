import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"
const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/v1/campaigns"
const VOTER_API_BASE_URL = "http://localhost:8080/api/v1/voters";

class VoterService {

    getVoters(){
        return axios.get(VOTER_API_BASE_URL);
    }

    getVotersByCampaign(campaignId){
        return axios.get(CAMPAIGN_API_BASE_URL + '/' + campaignId + '/voters');
    }
    
    getVotersByUser(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId + '/voters');
    }

    createVoter(campaignId, voter){
        return axios.post(CAMPAIGN_API_BASE_URL + '/' + campaignId + '/voters', voter);
    }

    getVoterById(voterId){
        return axios.get(VOTER_API_BASE_URL + '/' + voterId);
    }

    updateVoter(voter, voterId){
        return axios.put(VOTER_API_BASE_URL + '/' + voterId, voter);
    }

    deleteVoter(voterId){
        return axios.delete(VOTER_API_BASE_URL + '/' + voterId);
    }

    getCampaignByVoter(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId + '/voters/campaigns');
    }
    getVoter(userId,campaignId){
        return axios.get(USER_API_BASE_URL + '/' + userId + '/campaigns/' + campaignId + '/voters');
    }
    
    voted(userId,campaignId){
        return axios.put(USER_API_BASE_URL + '/' + userId + '/campaigns/' + campaignId + '/voters');
    }
}

export default new VoterService()