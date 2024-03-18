import React, {useContext, useState} from 'react';
import ModalLayout from "../ModalLayoat/ModalLayout";
import styles from './DeviceModal.module.css';
import {Context} from "../../../index";
import {createDevice} from "../../../http/deviceService";
import {observer} from "mobx-react-lite";

const DeviceModal = observer(({setOpen, isOpen}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  const {type, brand} = useContext(Context)

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selecetFile = e => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()

    try {
      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', brand.selectedBrand[0].id)
      formData.append('typeId', type.selectedType[0].id)
      formData.append('info', JSON.stringify(info))
      createDevice(formData)

      setFile(null)
      setInfo([])
      setName('')
      setPrice(0)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <ModalLayout setOpen={setOpen} isOpen={isOpen}>
      <form>
        <label className={styles.label}>
          Девайс:
          <input
            className={styles.input}
            type="text"
            placeholder='Введите название устройства'
            name='name'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>

        <label className={styles.label}>
          Цена:
          <input
            className={styles.input}
            type="number"
            placeholder='Введите цену устройства'
            name='price'
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
        </label>

        <label className={styles.label}>
          Фотография:
          <input
            className={styles.input}
            type="file"
            name='file'
            accept="image/png, image/jpeg, image/jpg"
            onChange={selecetFile}
          />
        </label>

        <div className={styles.typeSelect}>
          <label htmlFor="type-select" className={styles.typeLabel}>Выберите тип устройства:</label>
          <select
            name="types"
            id="type-select"
            className={styles.select}
            onChange={e => {
              const typeObj = type.getTypeByName(e.target.value)
              type.setSelectedTypeModal(typeObj)
            }}
          >
            {type.types.map(type => {
              return (
                <option
                  key={type.name}
                  value={type.name}
                >
                  {type.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.brandSelect}>
          <label htmlFor="brand-select" className={styles.brandLabel}>Выберите бренд устройства:</label>
          <select
            name="brands"
            id="brand-select"
            className={styles.select}
            onChange={e => {
              const brandObj = brand.getBrandByName(e.target.value)
              brand.setSelectedBrandModal(brandObj)
            }}
          >
            {brand.brands.map(brand => {
              return (
                <option
                  key={brand.name}
                  value={brand.name}
                >
                  {brand.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.infoSection}>
          <button
            className={styles.addCharacteristic}
            onClick={e => {
              e.preventDefault()
              addInfo()
            }}
          >
            Добавить характеристику
          </button>
          <div className={styles.info}>
            {info.map(i => {
              return (
                <div className={styles.infoItem} key={i.number}>
                  <input
                    type="text"
                    className={styles.infoInput}
                    placeholder='Введите название'
                    value={i.title}
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                  />
                  <input
                    type="text"
                    className={styles.infoInput}
                    placeholder='Введите описание'
                    value={i.description}
                    onChange={e => changeInfo('description', e.target.value, i.number)}
                  />
                  <button
                    className={styles.infoBtn}
                    onClick={e => {
                      e.preventDefault()
                      removeInfo(i.number)
                    }}
                  >
                    Удалить
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.save}>
          <button
            className={styles.closeBtn}
            onClick={e => {
              e.preventDefault()
              setOpen(false)
            }}
          >
            Закрыть
          </button>
          <button
            className={styles.saveBtn}
            onClick={e => {
              e.preventDefault()
              addDevice()
              setOpen(false)
            }}
          >
            Добавить
          </button>
        </div>
      </form>
    </ModalLayout>
  );
});

export default DeviceModal;