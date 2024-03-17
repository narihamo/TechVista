import React, {useContext, useEffect, useState} from 'react'
import styles from './Device.module.css'
import Navbar from "../../components/Navbar/Navbar";
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {getOneDevice} from "../../http/deviceService";
import star from '../../assets/rating.svg'
import StarRating from "../../components/Rating/StarRating/StarRating";
import {addToBasket, getAllBasket, minusCount, plusCount, removeFromBasket} from "../../http/basketService";
import {observer} from "mobx-react-lite";

export const Device = observer(() => {
  const [isOpen, setOpen] = useState(false)
  const [device, setDevice] = useState({info: []})
  const [clicked, setClicked] = useState(false)
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const {user, basket} = useContext(Context)
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
        if (user.isAuth) {
          const data = await getAllBasket(user.user.id)
          basket.setDevices(data)
          setClicked(false)
        }
      } catch (e) {
        alert(e.response.data.message)
      }
    }
    fetchData()
  }, [clicked]);

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
              {user.isAuth ?
                <div className={styles.basketActivites}>
                  <button
                    className={styles.basketBtn}
                    disabled={basket.isInBasket(device.id)}
                    onClick={() => {
                      setClicked(prevClicked => !prevClicked)
                      addToBasket(user.user.id, params.id)
                    }}
                  >
                    Добавить в корзину
                  </button>
                  {basket.isInBasket(device.id)
                    ?
                    <div className={styles.counters}>
                      <div className={styles.countersBtns}>
                        <button
                          className={styles.countBtn}
                          onClick={() => {
                            minusCount(user.user.id, device.id)
                            basket.decrement(device.id)
                          }}
                        >
                          -
                        </button>
                          {basket.getDevice(device.id)[0].count}
                        <button
                          className={styles.countBtn}
                          onClick={() => {
                            plusCount(user.user.id, device.id)
                            basket.increment(device.id)
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.remove}
                        onClick={() => {
                          basket.deleteDevice(device.id)
                          removeFromBasket(user.user.id, device.id)
                        }}
                      >
                        Удалить из корзины
                      </button>
                    </div> : null}

                </div> :
                <p className={styles.warning}>Авторизуйтесь, чтобы пользоваться корзиной и оценивать товары!
                </p>
              }
              {user.isAuth ?
                <div className={styles.rating}>
                  <div className={styles.deviceRating}>
                    Рейтинг: {device.rating}
                    <img src={star} alt={device.rating}/>
                  </div>
                  Ваша оценка:
                  <StarRating fillColor={'var(--blue)'} readOnly={
                    !user.isAuth
                  }/>
                </div> : null}
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
})