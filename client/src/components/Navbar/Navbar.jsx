import React, {useContext} from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts"
import {Context} from "../../index";

const Navbar = () => {
  const {user} = useContext(Context)

  return (
      <div className={styles.navbar}>
        <Link to={SHOP_ROUTE} className={styles.logo}>
          TechVista
        </Link>
        {user.isAuth
          ? <button
              className={styles.profile}
            >
              <img src="/profile.svg" alt="profile"/>
            </button>
          : <Link to={LOGIN_ROUTE} className={styles.login}>Войти</Link>}
      </div>
  );
};

export default Navbar;