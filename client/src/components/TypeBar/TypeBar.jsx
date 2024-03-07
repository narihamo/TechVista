import React, {useContext} from 'react';
import SelectedList from "../SelectedList/SelectedList";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
  const {type} = useContext(Context)

    return (
        <>
          <SelectedList arr={type._types} storeType='typestore' title={'Типы'}/>
        </>
    );
});

export default TypeBar;