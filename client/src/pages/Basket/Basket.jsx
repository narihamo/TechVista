import React, {useContext, useEffect, useState} from 'react'
import styles from './Basket.module.css'
import Navbar from "../../components/Navbar/Navbar";
import {getAllBasket} from "../../http/basketService";
import {Context} from "../../index";
import BasketList from "../../components/BasketList/BasketList";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";

const getBasketPrice = basket => {
  let result = 0

  basket.forEach(device => result += device.price)

  return result
}

const Basket = observer(() => {
  const [isOpen, setOpen] = useState(false)
  const {basket, user} = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBasket(user.user.id)
      console.log(data)
      basket.setDevices(data)
      console.log(basket.devices)
      basket.createCountedArr(basket.devices)
    }
    fetchData()
    // console.log(counted)
    // console.log(basket.countedDevices)
    // basket.setCountedDevices(counted)
  }, []);



  const basketPrice = getBasketPrice(basket.devices)

  return (
    <>
      <Navbar setOpen={setOpen} isOpen={isOpen}/>
      <div className={styles.wrap}>
        <div className={styles.basketListWrap}>
          <h1 className={styles.heading}>Корзина</h1>
          <BasketList/>
        </div>
        <div className={styles.basket}>
          <h2 className={styles.heading}>Итого к оплате: {basketPrice} RUB</h2>
          <div className={styles.total}>
            {basket.devices.map((device, index) => {
              return (
                <Link key={index} to={DEVICE_ROUTE + '/' + device.id} className={styles.totalItem}>
                  - {device.name}: {device.price} RUB
                </Link>
              )
            })}
          </div>
          <button className={styles.buyBtn}>Перейти к оплате</button>
        </div>
      </div>
    </>
  );
});

export default Basket;