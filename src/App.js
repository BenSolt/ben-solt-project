import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import RepoList from './components/RepoList';

import './MyApp.css';

function App() {

    const [repos, setRepos] = useState([]);
    const [searchResult, setSearchResult] = useState("");

    const [orgName, setOrgName] = useState("Netflix");
    const [inputValue, setInputValue] = useState("");

    //const [commitInfo, setCommitInfo] = useState([]);

    useEffect(() => {
        Axios
            .get(`https://api.github.com/orgs/${orgName}/repos`)
            //.get('https://api.github.com/orgs/Netflix/repos')
            .then(response => {
                
                const res = response.data
                // FILTER BY NAME
                // const res = response.data.filter(repo =>
                // repo.name.toLowerCase().includes(searchResult.toLowerCase()));
                
                // SORT REPOS STAR COUNT IN DESCENDING ORDER
                res.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });

                console.log(res)
                setRepos(res);
            })
            .catch(error => {
                console.error(error);

            });
    }, [searchResult,orgName]);

    // const handleChange = e => {
    //     setSearchResult(e.target.value);
    // };

    const handleChangeOrg = (e) => {
        setInputValue(e.target.value);
    };

    // COMMMITS //////////////////////////////////////////////////
    // useEffect(() => {
    //     const owner = 'test-user',
    //         repo = 'test-repo',
    //         perPage = 5;
    //     Axios
    //         .get(`https://api.github.com/repos/Netflix/astyanax/commits`, {owner, repo, per_page: perPage})
            
    //         .then(response => {
    //             const res = response.data
    //             console.log("commits:",res)
    //             setCommitInfo(res);
    //         })
    //         .catch(error => {
    //             console.error(error);

    //         });
    // }, []);

    
    return (
        <div className="App">
            <header>
                <h1>Netflix's Repositories and Commits</h1>
            </header>

            <div className="search-form">
             
                <input
                    className="input"
                    type="text"
                    placeholder="Search Organization"
                    name={orgName}
                    onChange={handleChangeOrg}
                    value={inputValue}
                />
                <button className="btnOrg" onClick={() => setOrgName(inputValue)}>Submit</button>
                <h2>Organization Name: {orgName}</h2>
            </div>


            <Routes>
                <Route path="/" element={<RepoList items={repos} />} />

                {/* <Route path="/" element={<RepoList commits={commitInfo} />} /> */}
                {/* <Route path="/movie/:id" element={<MoreInfoFilm/>}/> */}
            </Routes>

        </div>
    );
}

export default App;
