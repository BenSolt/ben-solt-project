import { useNavigate } from 'react-router-dom';

function RepoLists(props) {

    let navigate = useNavigate();

    function routeToItem(e, repo) {
        console.log(repo.name)
        navigate(`${repo.owner.login}/${repo.name}/commits`);
    };


    return (
        <div>
            {/* SEARCH BY ORGANIZATION */}
            <div className="search-form">
                <input
                    className="input"
                    type="text"
                    placeholder="Search Organization"
                    name={props.orgNameProp}
                    onChange={props.handleChangeOrgProp}
                    value={props.inputValueProp}
                />
                <button className="btnSubmit" onClick={props.assignInputValueProp}>SUBMIT</button>
            </div>

            {/* SEARCH BY REPOSITORY NAME */}
            <input
                className="input"
                type="text"
                placeholder="Search Repo by Name"
                onChange={props.handleChangeProp}
            />

            <div className="container">
                {props.items.map((item) => (
                    <div key={item.id} className={props.colorProp}>

                        <h2 className='orgTitle'>{item.owner.login}</h2>

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

                        <button className='btnOrg' onClick={(e) => routeToItem(e, item)}>COMMITS</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RepoLists;