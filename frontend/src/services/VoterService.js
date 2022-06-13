import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";
const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/campaigns";
const ALL_VOTER_API_BASE_URL = 'http://localhost:8080/api/campaigns/1/voters';
const VOTER_API_BASE_URL = "http://localhost:8080/api/voters";

class VoterService {

    getVoters(){
        return axios.get(ALL_VOTER_API_BASE_URL);
    }

    addVoter(voter){
        return axios.post(VOTER_API_BASE_URL, voter);
    }

    getVoterById(id){
        return axios.get(VOTER_API_BASE_URL + '/' + id);
    }

    deleteVoter(id){
        return axios.delete(VOTER_API_BASE_URL + '/' + id);
    }
}

export default new VoterService()