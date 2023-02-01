import { getFilmsID, getExtra } from '../componentsNew/info';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const tabs = [
    {
        id: '1',
        name: 'People',
    }
]


export default function MoreInfoFilm() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [repo, setRepo] = useState([{ 'id': 1, 'name': 'No names currently' }]);


    useEffect(() => {
        getFilmsID(id).then((event) => {
            setItem(event);
            let changedData = [];

            //if (event.repo[0] !== 'https://ghibliapi.herokuapp.com/people/') {
            if (event.repo[0] !== 'https://api.github.com/repos/Netflix/astyanax/commits{/sha}') {
                Promise.all(event.repo.map((item) => {
                    return getExtra(item).then((data) => {
                        changedData.push(data);
                        console.log(changedData)
                    });
                })).then(() => {
                    setRepo(changedData);
                });
            }

        })
    }, [id]);


    let navigate = useNavigate();
    function routeBack() {
        navigate("/");
    };
    

    return (
        <div>
<button onClick={routeBack}>BACK</button>
            <div className='bodyPadding'>
                
                <div id='film-grid'>
                    <div>
                        <div id='film-titles'>

                            <h3>Commit Title: {} </h3>
                            <h3>Commit Username: {}</h3>
                            <h3>Commit Hash: {}</h3>
                            <h3>Date Created: {}</h3>
                        </div>
                    </div>
                </div>

                <div id='tab-div'>
                    {tabs.map((tab) => (
                        <span key={tab.id}>
                            <h1>{tab.name}</h1>
                        </span>
                    ))}
                </div>

                <div className='people-container'>
                    {repo.map((item) => (
                      
                        <div className='grid-item' key={item.id}>
                            <h3>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}