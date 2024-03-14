import React, {useContext} from 'react';
import styles from './BasketListItem.module.css'
import {Link, useParams} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import {removeFromBasket} from "../../http/basketService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const BasketListItem = observer(({device, index}) => {
  const {user, basket} = useContext(Context)
  console.log('adsads = ', user.user.id, device.id)
  return (
    <div className={styles.basketItem}>
      <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name}/>
      <p className={styles.name} title={device.name}>{device.name}</p>
      <p className={styles.price}>{device.price} RUB</p>
      <Link className={styles.link} to={DEVICE_ROUTE + '/' + device.id}>Перейти к товару</Link>
      <div className={styles.itemNum}>
        <button className={styles.countBtn}>-</button>
        4
        <button className={styles.countBtn}>+</button>
      </div>
      <button className={styles.remove} onClick={() => {
        basket.deleteDevice(index)
        removeFromBasket(user.user.id, device.id)
      }}>Удалить из корзины</button>
    </div>
  );
});

export default BasketListItem;