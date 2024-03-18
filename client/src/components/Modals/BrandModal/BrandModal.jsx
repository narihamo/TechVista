import React, {useState} from 'react';
import ModalLayout from "../ModalLayoat/ModalLayout";
import styles from './BrandModal.module.css';
import {createBrand} from "../../../http/brandService";

const BrandModal = ({setOpen, isOpen}) => {
  const [brand, setBrand] = useState('')

  const handleChange = (event) => {
    setBrand(event.target.value)
  }

  return (
    <ModalLayout setOpen={setOpen} isOpen={isOpen}>
      <form>
        <label className={styles.label}>
          Бренд:
          <input
            className={styles.input}
            type="text"
            placeholder='Введите бренд'
            name='name'
            value={brand}
            onChange={handleChange}
          />
        </label>
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
              createBrand({name: brand})
              setBrand('')
              setOpen(false)
            }}
          >
            Добавить
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default BrandModal;