import React, {useContext} from 'react';
import styles from './Profile.module.css'
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE} from "../../../utils/consts";
import {Context} from "../../../index";

const Profile = ({isOpen}) => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logout = async () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={`${styles.modal} ${!isOpen ? styles.modalInactive : null}`}>
      <Link to={BASKET_ROUTE} className={styles.link}>Корзина</Link>
      {user.user.role !== "ADMIN"
        ? <Link to={ADMIN_ROUTE} className={styles.link}>Панель администратора</Link>
        : null}
      <div className={styles.link} onClick={logout}>Выход</div>
    </div>
  );
};

export default Profile;