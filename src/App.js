import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import RepoList from './components/RepoList';
import CommitList from './components/CommitList';

import './App.css';

function App() {

    const [repos, setRepos] = useState([]);
    const [searchResult, setSearchResult] = useState("");
    const [orgName, setOrgName] = useState("Netflix");
    const [inputValue, setInputValue] = useState("");
    const [color, setColor] = useState('netflixRed');

    useEffect(() => {
        Axios
            .get(`https://api.github.com/orgs/${orgName}/repos`)
            //.get('https://api.github.com/orgs/Netflix/repos')
            .then(response => {

                // FILTER BY NAME
                const res = response.data.filter(repo =>
                    repo.name.toLowerCase().includes(searchResult.toLowerCase()));

                // SORT REPOS STAR COUNT IN DESCENDING ORDER
                res.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });

                console.log(res)
                setRepos(res);
                ChangeColor();
            })
            .catch(error => {
                console.error(error);
            });
    }, [searchResult, orgName]);

    const handleChange = e => {
        setSearchResult(e.target.value);
    };

    useEffect(() => {
        Axios
            .get('https://api.github.com/organizations')

            .then(response => {
                const res = response.data
                res.sort(function (a, b) { return b.stargazers_count - a.stargazers_count });
                console.log('ORGS', res)
            })
            .catch(error => {
                console.error(error);

            });
    }, []);


    const handleChangeOrg = (e) => {
        setInputValue(e.target.value);
    };

    function assignInputValue() {
        if (inputValue === "") {
            setOrgName("Organization Name")
        } else {
            setOrgName(inputValue);
        }
    }

    // CHANGE ORGANIZATION CARD COLOR DEPENDING ON ORGANIZATION
    function ChangeColor() {
        for (let i = 0; i < repos.length; i++) {
            if (orgName === "netflix") {
                setColor('netflixRed');
            } else if (orgName === 'twitter') {
                setColor('blueTwitter');
            } else if (orgName === 'facebook') {
                setColor('blueFacebook');
            } else if (orgName === 'instagram') {
                setColor('orangeInstagram');
            } else if (orgName === 'errfree') {
                setColor('green');
            } else if (orgName === 'sevenwire') {
                setColor('yellow');
            } else if (orgName === 'gumgum') {
                setColor('pink');
            }
        }
    }


    return (
        <div className="App">
            <header className='textBox'>
                <h1>{orgName}'s</h1> <h1>Repositories and Commits</h1>
            </header>

            {/* SEARCH BY ORGANIZATION */}
            <div className="search-form">
                <input
                    className="input"
                    type="text"
                    placeholder="Search Organization"
                    name={orgName}
                    onChange={handleChangeOrg}
                    value={inputValue}
                />
                <button className="btnSubmit" onClick={assignInputValue}>SUBMIT</button>
            </div>

            {/* INPUT BAR TO SEARCH BY REPOSITORY NAME */}
            <input
                className="input"
                type="text"
                placeholder="Search Repo by Name"
                onChange={handleChange}
            />

            <Routes>
                <Route path="/" element={<RepoList items={repos} setColor={color} />} />
                <Route path="/:repo/commits" element={<CommitList setColor={color} />} />
            </Routes>

        </div>
    );
}

export default App;
