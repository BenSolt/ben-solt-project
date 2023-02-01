import { useNavigate } from 'react-router-dom';


function RepoLists(props) {

    let navigate = useNavigate();

    function routeToItem(e, repo) {
        navigate(`/repo/${repo.id}`);
    };

    return (
        <section>
            <div className="container">
                {props.items.map((item) => (
                    <div key={item.id} className='repoContainerCard'>
                        <div className='textBox'>
                            <h2>Repo Name: </h2>
                            <h2 className='infoText'>{item.name}</h2>
                        </div>
                        <div className='textBox'>
                            <h4>Language: </h4>
                            <h4 className='infoText'>{item.language}</h4>
                        </div>

                        <div>
                            <h4>Description:</h4>
                            <p className='infoText'>{item.description}</p>
                        </div>

                        <div className='textBox'>
                            <h4>Star Count:</h4>
                            <h4 className='infoText'>{item.stargazers_count}</h4>
                        </div>

                        <div className='textBox'>
                            <h4>Fork Count:</h4>
                            <h4 className='infoText'>{item.forks_count}</h4>
                        </div>

                        <div className='textBox'>
                            <h4>Date Created:</h4>
                            <h4 className='infoText'>{item.created_at}</h4>
                        </div>

                        {/* <button onClick={(e) => routeToItem(e, item)}>ABOUT</button> */}

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