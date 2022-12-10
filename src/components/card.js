import { round, upperCase } from 'lodash'
import React from 'react'

function Card({work}) {
  const {
    quantity,
    longitude,
    volume,
    area,
    type,
  } = work;

  return (
    <div style={{backgroundColor: 'white', maxWidth: '250px', padding: '20px', height: '200px', borderRadius: '6px'}}>
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>{upperCase(type)}</p>
      <p style={{textAlign: 'center', color: '#0055B8', fontWeight: 'bold'}}>
        {
          (longitude && `${round(longitude)} m`)
          || (volume && `${round(volume)} m3`)
          || (area && `${round(area)} m2`)
        }
      </p>
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>{round(quantity)} works</p>
    </div>
  )
}

export default Card