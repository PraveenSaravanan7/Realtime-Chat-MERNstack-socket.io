import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
const ls=require("local-storage")
export const ChatmsgList = (props) => {
    return (
        <>
        {props.msg.map((m)=>
    
        <div className={m.user!=ls('user_id')? "d-flex justify-content-end": "d-flex justify-content-start"} >
            
               <div className={m.user!=ls('user_id')?"msg-box":"msg-box2"} ><p className="m-0" > {m.text} </p></div>
       </div>
        )}

        </>
    )
}
