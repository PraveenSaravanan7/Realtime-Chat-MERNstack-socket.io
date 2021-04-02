import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "../api"
import { UsersList } from "../components/UsersList";
const ls=require("local-storage")
export const HomePage = () => {
    var [user,setUser]=useState([null])
    var [loading,setloading]=useState(true); 
    var [err,seterr]=useState(false); 
    var [users,setUsers]=useState([])
    async function getUser() {
        setloading(true)
        seterr(false)
        try {           
            let  url="/users"
          const response = await axios.get(url);  
          setloading(false)       
          if(response.data){
            console.log(response.data)
            return response.data
          }
          
        } catch (error) {
          seterr(error);
        }
      }

      async function getUsers() {
        seterr(false)
        try {           
            let  url="/users/allusers"
          const response = await axios.get(url);      
          if(response.data){
           console.log(response.data)
            return response.data
          }
          
        } catch (error) {
          seterr(error);
        }
      }
    
    useEffect(() => {
        getUser().then(data=>{
            setUser(data)
        })
        getUsers().then(data=>{
            setUsers(data)
        })
    }, [])
    return (
        <div >
        <div className="bg-white col-md-4  m-auto pt-4" >
           <h1 className="text-dark mb-4" ><b>Chat System</b></h1>
           
                {!loading?
                <div>
                    <h4 className="mb-3 text-primary" >Welcome {user.name} 👋</h4>
                  
                  {users.length ?  <UsersList users={users} ></UsersList>: null}
           
                </div>:
                <div class="container">
                <div class="row justify-content-center">
                <div class="col-auto">
                    <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div></div> </div></div> }
            </div>
        </div>
    )
}
