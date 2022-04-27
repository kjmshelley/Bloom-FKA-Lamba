import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

export async function get(url, callback) {
    try {
        const resp = await axios.get(`${BASE_URL}${url}`);
        if(resp.status !== 200) {
            throw Error(`Error retrieving data. Status code: ${resp.status}`);
        }
        return resp.data;
    } finally {}

}

export async function post(url, body) {
    try {
        const resp = await axios.post(`${BASE_URL}${url}`, body);
        if(resp.status !== 200) {
            throw Error(`Error creating quote. Status code: ${resp.status}`);
        }
        return resp.data;
    } finally {}
}

export async function put(url, body) {
    try {
        const resp = await axios.put(`${BASE_URL}${url}`, body);
        if(resp.status !== 200) {
            throw Error(`Error updating quote. Status code: ${resp.status}`);
        }
        return resp.data;
    } finally {}
}

export async function del(url, callback) {
    try {
        const resp = await axios.delete(`${BASE_URL}${url}`);
        if(resp.status !== 200) {
            throw Error(`Error retrieving data. Status code: ${resp.status}`);
        }
        return resp.data;
    } finally {}

}