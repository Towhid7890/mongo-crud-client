import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const{id} = useParams();
    const [user, setUser] = useState([])
    useEffect(() => {
     const url = `http://localhost:5000/user/${id}`
     fetch(url)
     .then(res => res.json())
     .then(data => setUser(data))

    }, []);

// sending server to update one data item

    const addUpdateUser=event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updateUser ={name,email};
        const url = `http://localhost:5000/user/${id}`
        fetch(url, {
           method: 'PUT', // or 'PUT'
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(updateUser),
         })
         .then(response => response.json())
         .then(data => {
           console.log('Success:', data);
           alert('user update successfully')
           event.target.reset()
         })
         .catch((error) => {
           console.error('Error:', error);
         });
        }


    
    return (
        <div>
            <h3>Updating id : {user.name}</h3>
            <form onSubmit={addUpdateUser}>
                <input type="text" name="name" required placeholder="Name" id="" />
                <br />
                <input type="email" name="email" required placeholder="Email" id="" />
                <br />
                <input type="submit" value="Update user" />
            </form>
        </div>
    );
};

export default UpdateUser;