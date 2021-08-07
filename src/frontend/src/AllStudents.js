import fetch from 'unfetch';
import {useState, useEffect} from "react";

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

function FetchStudents() {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("api/v2/users")
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserList(data)
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (userList.length <= 0) {
        return <div>
            <h3>SRY BUT NO USERS IN THE DATABASE</h3>
        </div>
    } else {

        return <div>
            {userList.map((user, index) => {
                return <div key={index+1}>
                    <h1>{index+1}. {user.name}</h1>
                    <p>{user.email}</p>
                    <p>{user.gender}</p>
                </div>
            })}
        </div>
    }
}

export default FetchStudents;



