import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function Home() {
  useEffect(() => {

    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [ -99.12766, 19.42847], // starting position [lng, lat]
    zoom: 5, // starting zoom
    projection: 'globe' // display the map as a 3D globe
    });
     
    map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
    });
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Toroto</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ height: '100vh', width: '100vw' }} id="map"></div>
    </div>
  )
}
