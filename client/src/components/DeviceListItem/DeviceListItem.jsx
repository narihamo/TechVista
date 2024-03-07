import React from 'react'
import styles from './DeviceListItem.module.css'
import star from '../../assets/rating.svg'
import {Link} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";

const DeviceListItem = ({device}) => {
  return (
      <div className={styles.device}>
        <Link to={DEVICE_ROUTE + '/' + device.id} className={styles.img}>
          <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name}/>
        </Link>
        <div className={styles.name}>{device.name}</div>
        <div className={styles.price}>{device.price} RUB</div>
        <div className={styles.rating}>
          <p>{device.rating}</p>
          <img src={star} alt="rating"/>
        </div>
      </div>
  )
}

export default DeviceListItem