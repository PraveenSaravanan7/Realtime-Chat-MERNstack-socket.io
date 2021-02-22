import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
const ls=require("local-storage")
export const ChatmsgList = (props) => {
    return (
        <>
        {props.msg.map((m)=>
        
        <div className="border-bottom mb-2" >
                <span> {m.user!=ls('user_id')? <>YOU:</>:<>Him:</> } </span>
               <span><b>{m.text}</b></span>
       </div>
        
        )}

        </>
    )
}
