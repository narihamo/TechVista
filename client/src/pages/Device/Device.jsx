import React, {useContext, useEffect, useState} from 'react'
import styles from './Device.module.css'
import Navbar from "../../components/Navbar/Navbar";
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {getOneDevice} from "../../http/deviceService";
import star from '../../assets/rating.svg'
import StarRating from "../../components/Rating/StarRating/StarRating";
import {addToBasket} from "../../http/basketService";
import basket from "../Basket/Basket";

export const Device = () => {
  const [isOpen, setOpen] = useState(false)
  const [device, setDevice] = useState({info: []})
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const {user} = useContext(Context)
  const description = [
    {id: 1, title: 'Оперативная память', description: '5 гб'},
    {id: 2, title: 'Камера', description: '12 мп'},
    {id: 3, title: 'Процессор', description: 'Пентиум 3'},
    {id: 4, title: 'Ядра', description: '2'},
    {id: 5, title: 'Аккамулятор', description: '4000'},
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneDevice(params.id)
        setDevice(data)
        setLoading(false)
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    fetchData()
  }, []);

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <Navbar setOpen={setOpen} isOpen={isOpen}/>
      <div className={styles.device}>
        <p className={styles.name}>{device.name}</p>
        <div className={styles.deviceInfo}>
          <div className={styles.basketAndImg}>
            <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name} className={styles.img}/>
            <div className={styles.basket}>
              <p className={styles.price}>Цена: {device.price} RUB</p>
              <button
                className={styles.basketBtn}
                onClick={() => addToBasket(user.user.id, params.id)}
              >
                Добавить в корзину
              </button>
              <div className={styles.rating}>
                <div className={styles.deviceRating}>
                  Рейтинг: {device.rating}
                  <img src={star} alt={device.rating}/>
                </div>
                Ваша оценка:
                <StarRating fillColor={'var(--blue)'} readOnly={
                  !user.isAuth
                }/>
              </div>
            </div>
          </div>
          <ul className={styles.infoList}>
            {description.map(el => {
              return (
                <li className={styles.infoListItem} key={el.id}>
                  {el.title}: {el.description}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
