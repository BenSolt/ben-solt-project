//const baseURL = 'https://ghibliapi.herokuapp.com/';
const baseURL = 'https://api.github.com/orgs/Netflix/repos';

export const getFilmsID = async (id) => {
    const res = await fetch(baseURL + 'commits_url/' + id);
    //const res = await fetch(baseURL + 'films/' + id);
    return res.json();
}