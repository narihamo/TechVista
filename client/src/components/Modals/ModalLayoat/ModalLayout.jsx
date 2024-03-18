import React, {useRef} from 'react';
import styles from './ModalLayout.module.css'
import close from '../../../assets/plus.svg'
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ModalLayout = ({children, setOpen, isOpen}) => {
  const modal = useRef()

  useOnClickOutside(modal, () => setOpen(false))

  return (
    <div className={`${styles.background} ${!isOpen ? styles.backgroundInactive : null}`}>
      <div className={styles.modal} ref={modal}>
        <div className={styles.close}>
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <img src={close} alt="closeBtn"/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;