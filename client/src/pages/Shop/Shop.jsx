import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DeviceList from '../../components/DeviceList/DeviceList'
import TypeBar from '../../components/TypeBar/TypeBar'
import BrandBar from '../../components/BrandBar/BrandBar';
import styles from './Shop.module.css'
import {getDevices} from "../../http/deviceService";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {getBrands} from "../../http/brandService";
import {getTypes} from "../../http/typeService";

const Shop = observer(() => {
  const [isOpen, setOpen] = useState(false)
  const {device, brand, type} = useContext(Context)

  useEffect(() => {
    getBrands().then(data => brand.setBrands(data))
    getTypes().then(data => type.setTypes(data))
    getDevices(null, null, 1, 5).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
    type.setSelectedType({})
    brand.setSelectedBrand({})
  }, [device.brands])

  useEffect(() => {
    getDevices(type.selectedType.id, brand.selectedBrand.id, device.page, 6).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, type.selectedType, brand.selectedBrand])

  return (
    <>
      <Navbar setOpen={setOpen} isOpen={isOpen}/>
      <div className={styles.shop}>
        <div className={styles.devicesFilter}>
          <TypeBar />
          <BrandBar/>
        </div>
        <div className={styles.devices}>
          <DeviceList/>
        </div>
      </div>
    </>
  )
})

export default Shop