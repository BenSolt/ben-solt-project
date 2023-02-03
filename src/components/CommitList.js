import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import '../App.css';

function CommitList(props) {

    const [commitInfo, setCommitInfo] = useState([]);

    const { org, repo } = useParams()

    //GET COMMMITS REQUEST//////////////////////////////////////////////////
    useEffect(() => {
        Axios
            .get(`https://api.github.com/repos/${org}/${repo}/commits`)
            .then(response => {
                const res = response.data
                console.log("commits:", res)
                setCommitInfo(res);
            })
            .catch(error => {
                console.error(error);

            });
    }, []);

    let navigate = useNavigate();

    {/* FUNCTION GO BACK TO REPO LIST PAGE (HOME) */}
    function routeBack() {
        navigate("/");
    };


    return (
        <div className="App">

            <div className='textBox'>
                 {/* DISPLAY REPO NAME */}
                <h2>Repo Name: </h2>
                <h2 className='infoText'>{repo}</h2>
                {/* BUTTON TO GO BACK TO REPO LIST PAGE (HOME) */}
                <button className="btnBack" onClick={routeBack}>BACK</button>
            </div>

            <div className="containerCommit">
                {commitInfo.map((item) => (
                    <div key={item.sha} className={props.setColor}>

                        <div className='textBox'>
                            <h4>Commit Title: </h4>
                            <h4 className='infoText'>WHAT'S TITLE?</h4>
                        </div>

                        <div className='textBox'>
                            <h4>Committer Username: </h4>
                            <h4 className='infoText'>{item.commit.committer.name}</h4>
                        </div>

                        <div className='textBox'>
                            <h4>Commit Hash: </h4>
                            <h4 className='infoText'>{item.sha}</h4>
                        </div>

                        <div className='textBox'>
                            <h4>Date Created: </h4>
                            <h4 className='infoText'>{item.commit.committer.date}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommitList;