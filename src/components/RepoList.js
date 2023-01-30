import { useNavigate } from 'react-router-dom';


function RepoLists(props) {

    let navigate = useNavigate();

    function routeToItem(e, movie) {
        //e.preventDefault();
        navigate(`/movie/${movie.id}`);
    };


    // const handleChange = e => {
    //     // console.log(e.target.value);
    //     setSearchResult(e.target.value);
    //   };

    return (

        <section>
            <div className="container">
                <p id='demo'></p>
                    {props.items.map((item) => (
                        <div key={item.id} className='repoContainer'>
                            <div>
                                <div>
                                    <h4>Repo Name: {item.name}</h4>
                                    <h4>Language: {item.language}</h4>
                                    <h4>Description: {item.description}</h4>
                                    <h4>Star Count: {item.stargazers_count}</h4>
                                    <h4>Fork Count: {item.forks_count}</h4>
                                    <h4>Date Created:{item.created_at}</h4>

                                    <button onClick={(e) => routeToItem(e, item)}>ABOUT</button>
                                </div>

                                <div className='repoCommits'>
                                    
                                <h3>ITEM</h3>
                                    <h4>Commit Title:{}</h4>
                                    <h4>Commit Username:{}</h4>
                                    <h4>Commit Hash:{}</h4>
                                    <h4>Dat Created:{}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </section>
    );
}

export default RepoLists;