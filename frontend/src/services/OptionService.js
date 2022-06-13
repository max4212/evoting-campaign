import axios from 'axios';

const CAMPAIGN_API_BASE_URL = "http://localhost:8080/api/campaigns";
const ALL_OPTION_API_BASE_URL = 'http://localhost:8080/api/campaigns/1/options';
const OPTION_API_BASE_URL = "http://localhost:8080/api/options";

class OptionService {

    getOptions(){
        return axios.get(ALL_OPTION_API_BASE_URL);
    }

    addOption(option){
        return axios.post(OPTION_API_BASE_URL, option);
    }

    getOptionById(id){
        return axios.get(OPTION_API_BASE_URL + '/' + id);
    }

    editOption(option, id){
        return axios.put(OPTION_API_BASE_URL + '/' + id, option);
    }

    deleteOption(id){
        return axios.delete(OPTION_API_BASE_URL + '/' + id);
    }
}

export default new OptionService()