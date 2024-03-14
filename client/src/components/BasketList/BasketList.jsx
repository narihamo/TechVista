import React, {useContext} from 'react';
import {Context} from "../../index";
import styles from './BasketList.module.css'
import BasketListItem from "../BasketListItem/BasketListItem";
import {observer} from "mobx-react-lite";

const BasketList = observer(() => {
  const {basket} = useContext(Context)

  return (
    <div className={styles.basketList}>
      {basket.devices.map((device, index) => {
        return (
          <BasketListItem device={device} index={index} key={index}/>
        )
      })}
    </div>
  );
});

export default BasketList;