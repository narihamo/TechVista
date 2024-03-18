import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import styles from './PaginationList.module.css'
import {Context} from "../../index";
import PaginationListItem from "../PaginationListItem/PaginationListItem";

const PaginationList = observer(() => {
  const {device} = useContext(Context)
  const pagesCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className={styles.list}>
      {pages.map(page => {
        return (
          <PaginationListItem
            key={page}
            active={device.page === page}
            page={page}
          />
        )
      })}
    </div>
  )
})

export default PaginationList