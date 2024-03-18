import React, {useContext, useEffect, useState} from 'react';
import styles from './Admin.module.css'
import Navbar from "../../components/Navbar/Navbar";
import TypeModal from "../../components/Modals/TypeModal/TypeModal";
import BrandModal from "../../components/Modals/BrandModal/BrandModal";
import DeviceModal from "../../components/Modals/DeviceModal/DeviceModal";
import {getTypes} from "../../http/typeService";
import {Context} from "../../index";
import {getBrands} from "../../http/brandService";

const Admin = () => {
  const [open, setOpen] = useState(false)
  const [typeModal, setTypeModal] = useState(false)
  const [brandModal, setBrandModal] = useState(false)
  const [deviceModal, setDeviceModal] = useState(false)
  const {type, brand} = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTypes()
      type.setTypes(data)
      type.setSelectedType(data[0])
    }
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBrands()
      brand.setBrands(data)
      brand.setSelectedBrand(data[0])
    }
    fetchData()
  }, []);

  return (
    <>
      <Navbar setOpen={setOpen} isOpen={open}/>
      <div className={styles.panel}>
        <button
          className={styles.addBtn}
          onClick={() => setTypeModal(true)}
        >
          Добавить тип
        </button>
        <TypeModal setOpen={setTypeModal} isOpen={typeModal}/>
        <button
          className={styles.addBtn}
          onClick={() => setBrandModal(true)}
        >
          Добавить бренд
        </button>
        <BrandModal setOpen={setBrandModal} isOpen={brandModal}/>
        <button
          className={styles.addBtn}
          onClick={() => setDeviceModal(true)}
        >
          Добавить устройство
        </button>
        <DeviceModal setOpen={setDeviceModal} isOpen={deviceModal}/>
      </div>
    </>
  );
};

export default Admin;