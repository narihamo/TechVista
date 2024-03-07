import React, {useContext} from 'react'
import { Context } from '../..'
import SelectedList from "../SelectedList/SelectedList";
import {observer} from "mobx-react-lite";


const BrandBar = observer(() => {
  const {brand} = useContext(Context)

  return (
    <>
      {/*{brand._brands.map(brand => brand.name)}*/}
      <SelectedList arr={brand._brands} storeType={'brandstore'} title={'Бренды'}/>
    </>
  )
})

export default BrandBar
