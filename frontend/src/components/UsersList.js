import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

export const UsersList = (props) => {
    return (
        <>
            {props.users.map((u) =>
                <div className="mb-2" >
                    <NavLink to={'/chat?id=' + u._id} >
                        <div className="d-flex flex-row mb-2 text-black us-none">
                            <div className="p-2 pl-0">
                                <img className="user-pic" src={"https://picsum.photos/50?random="+u._id} />
                            </div>
                            <div className="p-2 "> 
                            <h5 className="mb-0" >{u.name} </h5>
                            <span className="text-muted" ><small> {u.email} </small></span>
                            </div>
                        </div>
                    </NavLink>
                </div>
            )}

        </>
    )
}
