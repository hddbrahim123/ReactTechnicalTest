import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import isAdmin from '../../Core/helpers/isAdmin'

const Sidebar = ()=>{

  let isOpen = useSelector(state => state.Layout.leftMenu)

  const [users , setUsres] = useState(false)
  const [documents , setDocumnets] = useState(false)

  const toggleUsers = () => setUsres(!users)
  const toggleDocuments = () => setDocumnets(!documents)

  

    return (
        <React.Fragment>
         <div className={isOpen ? "sidebar show__sidebar " : "sidebar shadow-sm"}>
           <nav className="sidebar__container">
              <div className="sidebar__list">
                {isAdmin() && (
                  <div className="sidebar__items">
                    <h2 className="sidebar__subtitle">users management</h2>

                    <div className="sidebar__dropdown">
                      <Link to="#" className="sidebar__links" onClick={toggleUsers}>
                          <i className='bx bx-user  sidebar__icon' ></i>
                          <span className="sidebar__name">users</span>
                          <i className='bx bx-chevron-down sidebar__icon sidebar__dropdown__icon'></i>
                      </Link>
                      <div className={ users ? "sidebar__dropdown__collapse show__dropdown" : "sidebar__dropdown__collapse" }>
                          <div className="sidebar__dropdown__content">
                              <Link to="/admin/users/create" className="sidebar__dropdown__links">add user</Link>
                              <Link to="/admin/users" className="sidebar__dropdown__links">display users</Link>
                          </div>
                      </div>
                    </div>
                  </div>
                )}
                

                <div className="sidebar__items">
                  <h2 className="sidebar__subtitle">Document</h2>

                  <div className="sidebar__dropdown">
                    <Link to="#" className="sidebar__links" onClick={toggleDocuments}>
                        <i className='bx bx-home sidebar__icon' ></i>
                        <span className="sidebar__name">documents</span>
                        <i className='bx bx-chevron-down sidebar__icon sidebar__dropdown__icon'></i>
                    </Link>
                    <div className={ documents ? "sidebar__dropdown__collapse show__dropdown" : "sidebar__dropdown__collapse" }>
                        <div className="sidebar__dropdown__content">
                            <Link to="/admin/documents/create" className="sidebar__dropdown__links">add document</Link>
                            <Link to="/admin/documents" className="sidebar__dropdown__links">display documents</Link>
                        </div>
                    </div>
                  </div>
                </div>                
             </div>
           </nav> 
         </div>
        </React.Fragment>
    )
}

export default Sidebar
