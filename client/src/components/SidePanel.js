//import React, { useState } from 'react'
import styles from './SidePanel.module.scss';

export const SidePanel = (props) => {

  return (
    <div className={`${styles.SidePanel} ${props.className}`}>
      <h1>Hej dopice</h1>

    </div >
  )
}
