import React, {useContext, useEffect, useState} from 'react'
import styles from './Registration.module.css'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {login, registration} from "../../http/userService";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

export const Registration = () => {
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
      const data = await registration(email, password)
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
              autoComplete='new-password'
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
              autoComplete='new-password'
            />
          </label>
        </div>
        <button className={styles.button}>Зарегестрироваться</button>
        <p className={styles.haveAccount}>
          Уже зарегестрированы? <Link to={LOGIN_ROUTE}>Войти в аккаунт.</Link>
        </p>
      </form>
    </div>
  )
}
