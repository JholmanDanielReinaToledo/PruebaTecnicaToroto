import Head from "next/head";
import styles from "../../styles/Home.module.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import Header from "../../src/layouts/header";
import Footer from "../../src/layouts/footer";
import { useRouter } from "next/router";
import { getFarmer } from "../../src/commons";
import Image from "next/image";
import { calculateBounds } from "../../src/utils";
import { map } from "lodash";
import Card from "../../src/components/card";
import AliceCarousel from "react-alice-carousel";
import { useWorks } from "../../src/context/worksContext";
import DashBoard from "../../src/components/dashBoard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function FarmerDetail({ farmer }) {
  useEffect(() => {
    const mapBox = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      projection: "globe",
      center: farmer?.centroid?.geometry?.coordinates,
      maxZoom: 11,
      maxBounds: calculateBounds(farmer?.centroid?.geometry?.coordinates),
    });

    mapBox.on("style.load", () => {
      mapBox.setFog({});
    });

    mapBox.on("load", () => {
      mapBox.addSource(farmer?._id, farmer.geoJson);
      const layer = mapBox.getLayer(farmer?._id)
      if (!layer) {
        mapBox.addLayer({
          id: farmer?._id,
          type: "fill",
          source: farmer?._id,
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.5,
          },
        });
      }

      const start = {
        center: farmer?.centroid?.geometry?.coordinates,
        zoom: 14,
      };

      const end = {
        center: farmer?.centroid?.geometry?.coordinates,
        zoom: 9.5,
      };

      let isAtStart = true;

      const target = isAtStart ? end : start;
      isAtStart = !isAtStart;

      mapBox.flyTo({
        ...target,
        duration: 5000,
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Toroto</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div
        style={{
          backgroundColor: "#F5F5F5",
          paddingLeft: "60px",
          paddingRight: "60px",
        }}>
        <div
          style={{
            padding: "30px",
            fontWeight: "bold",
            fontSize: "2em",
            color: "#0055B8",
          }}>
          General information
        </div>
        <div className='row' style={{ height: "54vh", width: "90vw" }}>
          <div className='column side'>
            <div className='card'>
              <Image
                src={farmer?.image}
                width='370'
                height='200'
                alt=''
                style={{ borderRadius: "6px", marginBottom: "20px" }}
              />
              <div className='horizontalDiv'>
                <Image
                  src='/images/name_icon.svg'
                  width='30'
                  height='30'
                  alt=''
                />
                <div>
                  <b>Name:</b> {farmer?.name}
                </div>
              </div>
              <div className='horizontalDiv'>
                <Image
                  src='/images/descripcion_icon.svg'
                  width='30'
                  height='30'
                  alt=''
                />
                <div>
                  <b>ID:</b> #{farmer?.identifier}
                </div>
              </div>
            </div>
          </div>

          <div className='column middle'>
            <div className='card'>
              <div className='horizontalDiv'>
                <Image
                  src='/images/location_icon.svg'
                  width='30'
                  height='30'
                  alt=''
                />
                <div>
                  <b>State:</b> {farmer?.state} <b>Sown area:</b>{" "}
                  {farmer?.sownArea} ha
                </div>
              </div>

              <div className='horizontalDiv'>
                <div>
                  <b>Municipality:</b> {farmer?.state}
                </div>
              </div>

              <div className='horizontalDiv'>
                <Image
                  src='/images/water_icon.svg'
                  width='30'
                  height='30'
                  alt=''
                />
                <div>
                  <b>Hidryc regime:</b> {farmer?.hydricRegime}
                </div>
              </div>

              <div className='horizontalDiv'>
                <Image
                  src='/images/agriculture_icon.svg'
                  width='30'
                  height='30'
                  alt=''
                />
                <div>
                  <b>Agriculture technology:</b> {farmer?.agricultureTechnology}
                </div>
              </div>
            </div>
          </div>

          <div className='column side'>
            <div
              style={{ height: "40vh", width: "25vw", borderRadius: "6px" }}
              id='map'></div>
          </div>
        </div>
        <DashBoard />
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const farmer = await getFarmer(id);

  return {
    props: { farmer },
  };
}
