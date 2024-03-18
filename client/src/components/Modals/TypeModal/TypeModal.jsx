import React, {useState} from 'react';
import ModalLayout from "../ModalLayoat/ModalLayout";
import styles from './TypeModal.module.css'
import {createType} from "../../../http/typeService";

const TypeModal = ({setOpen, isOpen}) => {
  const [type, setType] = useState('')

  const handleChange = (event) => {
    setType(event.target.value)
  }

  return (
    <ModalLayout setOpen={setOpen} isOpen={isOpen}>
      <form>
        <label className={styles.label}>
          Тип:
          <input
            className={styles.input}
            type="text"
            placeholder='Введите тип'
            name='name'
            value={type}
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
              createType({name: type})
              setType('')
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

export default TypeModal;