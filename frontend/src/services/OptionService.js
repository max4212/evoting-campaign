import axios from 'axios';

const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/v1/campaigns"
const OPTION_API_BASE_URL = "http://localhost:8080/api/v1/options";

class OptionService {

    getOptions(){
        return axios.get(OPTION_API_BASE_URL);
    }

    getOptionsByCampaign(campaignId){
        return axios.get(CAMPAIGN_API_BASE_URL + '/' + campaignId + '/options');
    }

    createOption(campaignId, option){
        return axios.post(CAMPAIGN_API_BASE_URL + '/' + campaignId + '/options', option);
    }

    getOptionById(optionId){
        return axios.get(OPTION_API_BASE_URL + '/' + optionId);
    }

    updateOption(option, optionId){
        return axios.put(OPTION_API_BASE_URL + '/' + optionId, option);
    }

    deleteOption(optionId){
        return axios.delete(OPTION_API_BASE_URL + '/' + optionId);
    }
}

export default new OptionService()