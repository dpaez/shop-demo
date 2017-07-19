import axios from 'axios';

export function get(where){
    return axios.get(where)
        .then(response => response.data);
}
