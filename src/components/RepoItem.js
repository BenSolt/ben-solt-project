import { getFilmsID, getExtra } from '../componentsNew/info';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
// import EndButtonRedirect from '../components/endButtons';

const tabs = [
    {
        id: '1',
        name: 'People',
    }
]


export default function MoreInfoFilm() {
    const { id } = useParams();
    const [film, setFilm] = useState([]);
    const [people, setPeople] = useState([{ 'id': 1, 'name': 'No characteres can be named currently' }]);


    useEffect(() => {
        getFilmsID(id).then((event) => {
            setFilm(event);
            let changedData = [];

            if (event.people[0] !== 'https://ghibliapi.herokuapp.com/people/') {
                Promise.all(event.people.map((person) => {
                    return getExtra(person).then((data) => {
                        changedData.push(data);
                    });
                })).then(() => {
                    setPeople(changedData);
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
                    <div className='center-layout'>
                        <img id='film-img' src={film.movie_banner} alt={film.title}></img>
                    </div>
                    
                    <div>
                        <div id='film-titles'>
                            <h2>{film.title} </h2>
                            <h2>{film.original_title}</h2>
                            <h2>{film.original_title_romanised}</h2>
                        </div>
                        <div id='film-titles'>
                            <h3 className='font-med'>Director: {film.director} ·</h3>
                            <h3 className='font-med' style={{ margin: '0 5px' }}>Producer: {film.producer}</h3>
                        </div>
                        <div id='film-titles'>
                            <h4 className='font-small'>{film.release_date} ·</h4>
                        </div>
            
                        <h6 className='font-med'>{film.description}</h6>
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
                    {people.map((item) => (
                      
                        <div className='grid-item' key={item.id}>
                            <h3>{item.name}</h3>
                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}