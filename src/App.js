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

    //API: GET REPOS REQUEST//////////////////////////////////////////////////
    useEffect(() => {
        Axios
            .get(`https://api.github.com/orgs/${orgName}/repos`)
            .then(response => {

                // FILTER BY NAME AND SET TO LOWER CASE
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

    // INPUT VALUE FOR SEARCHING BY REPO NAME
    const handleChange = e => {
        setSearchResult(e.target.value);
    };

    // UPDATES INPUT VALUE FOR ORGANIZATION
    const handleChangeOrg = (e) => {
        setInputValue(e.target.value);
    };

    // INPUT VALUE WRITTEN USED TO GET SAID ORGANIZATION FROM API GET REQUEST
    function assignInputValue() {
        if (inputValue === "") {
            setOrgName("Organization Name")
        } else {
            setOrgName(inputValue);
        }
    }

    // CHANGE ORGANIZATION CARD COLOR DEPENDING ON ORGANIZATION API GET REQUEST
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

            <Routes>
                <Route path="/" element={<RepoList items={repos} colorProp={color}  handleChangeOrgProp={handleChangeOrg}
                orgNameProp={orgName} inputValueProp={inputValue} assignInputValueProp={assignInputValue} 
                handleChangeProp={handleChange}
                />} />
                <Route path="/:org/:repo/commits" element={<CommitList colorProp={color} />} />
            </Routes>

        </div>
    );
}

export default App;
