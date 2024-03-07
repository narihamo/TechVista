import React, {useContext, useEffect, useState} from 'react'
import styles from './Auth.module.css'
import {Link, useNavigate} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../../utils/consts";
import {login} from "../../http/userService";
import {Context} from "../../index";

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user} = useContext(Context)

  useEffect(() => {
    if (user.isAuth) {
      navigate('/')
    }
  }, [user.isAuth]);

  const submit = async (event) => {
    event.preventDefault()
    try {
      const data = await login(email, password)
      user.setUser(data)
      user.setIsAuth(true)
      navigate('/')
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.inputWrap}>
          <label>
            <p className={styles.inputHeader}>Почта:</p>
            <input
              type="text"
              name='email'
              className={styles.input}
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </label>
        </div>
        <div className={styles.inputWrap}>
          <label>
            <p className={styles.inputHeader}>Пароль:</p>
            <input
              type="password"
              name='password'
              className={styles.input}
              onChange={event => setPassword(event.target.value)}
              value={password}
            />
          </label>
        </div>
        <button className={styles.button}>Войти</button>
        <p className={styles.haveAccount}>
          Еще не зарегестрированы? <Link to={REGISTRATION_ROUTE}>Зарегестрироваться.</Link>
        </p>
      </form>
    </div>
  )
}
