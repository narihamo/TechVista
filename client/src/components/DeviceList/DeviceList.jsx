import React, {useContext} from 'react';
import DeviceListItem from "../DeviceListItem/DeviceListItem";
import styles from './DeviceList.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className={styles.deviceList}>
            {device.devices && device.devices.map(device => {
                return <DeviceListItem device={device} key={device.id}/>
            })}
        </div>
    )
})

export default DeviceList