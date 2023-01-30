import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import RepoList from './components/RepoList';

import './MyApp.css';

function App() {

  const [repos, setRepos] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const points = [40, 100, 1, 5, 25, 10];
  console.log(points.sort(function(a, b){return b-a}));
  
  useEffect(() => {
    Axios
      .get('https://api.github.com/orgs/Netflix/repos')

      .then(response => {
        const res = response.data
        res.sort(function(a,b) { return b.stargazers_count - a.stargazers_count});
        // const res = response.data.filter(movie =>
        // movie.stargazers_count.toLowerCase().includes(searchResult.toLowerCase()));
        console.log(res)
        setRepos(res);
      })
      .catch(error => {
        console.error(error);

      });
  }, [searchResult]);

  const handleChange = e => {
    // console.log(e.target.value);
    setSearchResult(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Netflix's Repositories and Commits</h1>
      </header>

    <div className="search-form">
      <input
      className="input"
      placeholder="Search Movie"
      onChange={handleChange}
      />
    </div>
     

      <Routes>
        <Route path="/" element={<RepoList items={repos} />} />
        {/* <Route path="/movie/:id" element={<MoreInfoFilm/>}/> */}
      </Routes>

    </div>
  );
}

export default App;