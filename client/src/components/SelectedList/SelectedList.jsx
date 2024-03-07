import React, {useContext} from 'react';
import styles from './SelectedList.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SelectedList = observer(({arr, storeType = '', title}) => {
    const {type, brand} = useContext(Context)
    const isTypeStore = storeType === 'typestore'

    return (
        <div className={styles.wrap}>
          <div className={styles.title}>{title}</div>
          <div className={styles.list}>
            {arr.map((el, index) => {
                return (
                    <div
                      key={el.name}
                      className={`
                        ${styles.listItem} 
                        ${isTypeStore 
                          ? type._selectedType.id === el.id ? styles.selected : null 
                          : brand._selectedBrand.id === el.id ? styles.selected : null}`}
                      onClick={() => storeType === 'typestore'
                        ? type.setSelectedType(el)
                        : brand.setSelectedBrand(el)}
                    >
                      {el.name}
                    </div>
                )
            })}
          </div>
        </div>
    );
});

export default SelectedList;