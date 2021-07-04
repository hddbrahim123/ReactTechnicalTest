import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import isAuth from '../../Core/helpers/isAuth'

import avatar from '../../assets/icons/avatar-1.jpg'
import { toggleLeftmenu } from '../../store/layout/actions'

const Header = ()=>{

    let isOpen = useSelector(state => state.Layout.leftMenu)
    const dispatch = useDispatch()

     const {user} = isAuth()

    const [showProfileMenu , setShowProfileMenu] = useState(false)
    const toggleProfileMenu = ()=>setShowProfileMenu(!showProfileMenu)

    const logout = () => {
      localStorage.removeItem('token')
    }

    useEffect(()=>{
      console.log(isAuth())
    },[])


    return (
        <React.Fragment>
            <header className="head__main shadow-sm">
             <nav className="head">   
              <div className="head__toggle" onClick={()=> {dispatch(toggleLeftmenu(!isOpen))}}>
                <div className="head__brand">
                   <i className='bx bxs-disc nav__icon' ></i>
                   <span className="head__logo">hddbrahim</span>
                </div>

                {isOpen ? 
                    <i className='bx bx-x head__icon'></i>
                :
                    <i className='bx bx-menu-alt-left head__icon'></i>
                }
              </div>
              
              <div className="head__right">
              <div className="head__profile" onClick={toggleProfileMenu}>
               <img src={avatar} alt="profile" className="head__avatar" />
               <span className="head__profile__name headprofile__icon">{user.name}</span>
               <i className='bx bx-down-arrow-alt head__profile__icon'></i>

               <div className={showProfileMenu ? "head__profile__collapse show__profile" : "head__profile__collapse"}>
                  <div className="head__profile__content shadow">
                        <ul>
                          <li><Link to="/admin/profile" className="head__profile__link"><i className='bx bx-user head__profile__link__icon'></i>profile</Link> </li>
                          <hr/>
                          <li><Link to="#" onClick={logout} className="head__profile__link"><i className='bx bx-log-out head__profile__link__icon' ></i>log out</Link> </li>
                        </ul>   
                   </div> 
               </div>
               
              </div>
              </div>
             </nav>
            </header>
        </React.Fragment>
    )
}

export default Header
