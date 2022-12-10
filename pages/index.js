import Head from "next/head";
import styles from "../styles/Home.module.css";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { getFarmers } from "../src/commons";
import { map } from "lodash";
import Header from "../src/layouts/header";
import Footer from "../src/layouts/footer";
import { farmerToModal } from "../src/utils";
import { useWorks } from "../src/context/worksContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home({ farmers }) {
  useEffect(() => {
    const mapBox = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-99.12766, 19.42847],
      zoom: 5,
      projection: "globe",
    });

    mapBox.on("style.load", () => {
      mapBox.setFog({});
    });

    mapBox.on("load", () => {
      map(farmers, (farmer) => {
        mapBox.addSource(farmer?._id, {
          type: "geojson",
          data: farmer.centroid,
        });

        mapBox.addLayer({
          id: farmer?._id,
          type: "circle",
          source: farmer?._id,
        });

        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(images/stateenabled.svg)`;
        el.style.width = `${40}px`;
        el.style.height = `${40}px`;
        el.style.backgroundSize = "100%";

        new mapboxgl.Marker(el)
          .setLngLat(farmer.centroid.geometry.coordinates)
          .addTo(mapBox);

        mapBox.on("mouseenter", farmer._id, () => {
          new mapboxgl.Popup({ maxWidth: "500px" })
            .setLngLat(farmer.centroid.geometry.coordinates)
            .setHTML(farmerToModal(farmer))
            .addTo(mapBox);
          el.style.backgroundImage = `url(images/statehover.svg)`;
        });
        mapBox.on("mouseleave", farmer._id, () => {

          el.style.backgroundImage = `url(images/stateenabled.svg)`;
        });
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

      <div style={{ height: "86vh", width: "100vw" }} id='map'></div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const farmers = await getFarmers();
  return {
    props: { farmers },
  };
}
