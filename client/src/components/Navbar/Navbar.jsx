import React, {useContext, useRef} from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts"
import {Context} from "../../index";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Profile from "../Modals/Profile/Profile";

const Navbar = ({setOpen, isOpen}) => {
  const {user} = useContext(Context)

  const handleClick = () => setOpen(true)
  const close = () => setOpen(false)

  const modal = useRef()

  useOnClickOutside(modal, close)

  return (
      <div className={styles.navbar}>
        <Link to={SHOP_ROUTE} className={styles.logo}>
          TechVista
        </Link>
        {user.isAuth
          ? <button
              className={styles.profile}
              ref={modal}
              onClick={handleClick}
            >
              <img src="/profile.svg" alt="profile"/>
            <Profile isOpen={isOpen}/>
            </button>
          : <Link to={LOGIN_ROUTE} className={styles.login}>Войти</Link>}
      </div>
  );
};

export default Navbar;