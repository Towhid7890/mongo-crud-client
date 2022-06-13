import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    //This is for show data in client side views
const [users, setUsers] = useState([])
useEffect(() => {
  fetch('http://localhost:5000/user')
  .then(res=>res.json())
  .then(data => setUsers(data))
}, [])

//This is for sending post data to the server
const addNewUser=event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user ={name,email};

    fetch('http://localhost:5000/user', {
       method: 'POST', // or 'PUT'
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(user),
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
       alert('user added successfully')
       event.target.reset()
     })
     .catch((error) => {
       console.error('Error:', error);
     });
    }

    //This is for delete data from database and also client side

    const handleDeleteUser = id=> {
        const proceed = window.confirm('Are you sure you want to delete');
        if(proceed){
            console.log('Delete id ', id);
            const url = `http://localhost:5000/user/${id}`
            fetch(url,{
              method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.deletedCount > 0){
                console.log('successfully')
                const remaining = users.filter(user => user._id !== id);
                setUsers(remaining)
              }
            })
        }
    }
    return (
        <div>
            <h2>You can add user from here</h2>
            <form onSubmit={addNewUser}>
                <input type="text" name="name" required placeholder="Name" id="" />
                <br />
                <input type="email" name="email" required placeholder="Email" id="" />
                <br />
                <input type="submit" value="Add User" />
            </form>
            <h2>Loading users : {users.length}</h2>
            <ul>
            {
                users.map(user => <li
                key={user._id}>
                  {user.name} :: {user.email}
                 <Link to={`/update/${user._id}`}><button>UPdate User</button></Link>
                 <button onClick={() =>handleDeleteUser(user._id)}>X</button>
                </li>)
            }
            </ul>
        </div>
    );
};

export default Home;