import React, {useContext} from 'react';
import styles from './PaginationListItem.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const PaginationListItem = observer(({page, active}) => {
  const {device} = useContext(Context)

  return (
    <div
      className={`${styles.item} ${active ? styles.itemActive : null}`}
      onClick={() => device.setPage(page)}
    >
      {page}
    </div>
  );
});

export default PaginationListItem;