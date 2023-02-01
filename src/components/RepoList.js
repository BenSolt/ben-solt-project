import { useNavigate } from 'react-router-dom';


function RepoLists(props) {

    let navigate = useNavigate();

    function routeToItem(e, repo) {
        //e.preventDefault();
        navigate(`/repo/${repo.id}`);
    };


    // const handleChange = e => {
    //     // console.log(e.target.value);
    //     setSearchResult(e.target.value);
    //   };

    return (

        <section>
            <div className="container">
                {props.items.map((item) => (
                    <div key={item.id} className='repoContainerCard'>
                        <div className='test'>
                            <h2>Repo Name: </h2>
                            <h2 className='infoText'>{item.name}</h2>
                        </div>
                        <div className='test'>
                            <h3>Language: </h3>
                            <h3 className='infoText'>{item.language}</h3>
                        </div>

                        <div>
                            <h3>Description:</h3>
                            <p className='infoText'>{item.description}</p>
                        </div>

                        <div className='test'>
                            <h3>Star Count:</h3>
                            <h3 className='infoText'>{item.stargazers_count}</h3>
                        </div>

                        <div className='test'>
                            <h3>Fork Count:</h3>
                            <h3 className='infoText'>{item.forks_count}</h3>
                        </div>

                        <div className='test'>
                            <h3>Date Created:</h3>
                            <h3 className='infoText'>{item.created_at}</h3>
                        </div>

                        <button onClick={(e) => routeToItem(e, item)}>ABOUT</button>

                    </div>
                ))}

                {/* {props.commits.map((info) => (
                    <div key={info.id} className='repoContainerCard'>
                        <div>
                            <div className='repoCommits'>
                                <h2>ITEM</h2>
                                <h3>Commit Title:{ }</h3>
                                <h3>Commit Username:{ }</h3>
                                <h3>Commit Hash:{ }</h3>
                                <h3>Dat Created:{ }</h3>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>

        </section>
    );
}

export default RepoLists;