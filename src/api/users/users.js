import axios from "axios";

function getAllUsers() {
    return new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                resolve(response);
            })
            .catch(() => {
                alert('error')
                reject();
            });
    });
}

function getAllUsersByPage(page, limit) {
    return new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users', {
            params: {
                _page: page,
                _limit: limit
            }
        })
            .then((response) => {
                resolve(response);
            })
            .catch(() => {
                alert('error')
                reject();
            });
    });
}

export default {
    getAllUsersByPage,
    getAllUsers
}
