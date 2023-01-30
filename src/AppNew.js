import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import RepoList from './components/RepoList';

import './MyApp.css';

function App() {

  const [repos, setRepos] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const [people, setPeople] = useState([]);

  useEffect(() => {
    Axios
      .get('https://api.github.com/orgs/Netflix/repos')

      .then(response => {
        const res = response.data
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
        <h1>HEADER</h1>
        <h1>FILM NAME</h1>
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
        {/* <Route path="/movie/:id" element={<FilmPageNew items={movies}/>} /> */}
      </Routes>

    </div>
  );
}

export default App;