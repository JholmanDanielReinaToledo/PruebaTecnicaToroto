import Head from "next/head";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import Header from "../../src/layouts/header";
import Footer from "../../src/layouts/footer";
import { getFarmer } from "../../src/commons";
import { calculateBounds, coordinatesToGeoJsonPolygon } from "../../src/utils";
import DashBoard from "../../src/components/dashBoard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function FarmerDetail({ farmer }) {
  useEffect(() => {
    const mapBox = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      projection: "globe",
      center: farmer?.centroid?.geometry?.coordinates,
      maxZoom: 14,
      maxBounds: calculateBounds(farmer?.geoJson),
    });

    mapBox.on("style.load", () => {
      mapBox.setFog({});
    });

    mapBox.on("load", () => {
      mapBox.addSource(farmer?._id, coordinatesToGeoJsonPolygon(farmer?.geoJson?.geometry?.coordinates));
      const layer = mapBox.getLayer(farmer?._id);
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
        zoom: 2,
      };

      const end = {
        center: farmer?.centroid?.geometry?.coordinates,
        zoom: 11,
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
    <div>
      <Head>
        <title>Toroto</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='container'>
        <p className='title2'>General information</p>
        <div style={{ height: "43vh", width: "90vw" }}>
          <div className='column left'>
            <div className='card'>
              <img
                src={farmer?.image}
                alt={farmer?.name}
                className='farmerImage'
              />
              <div className='horizontalDiv'>
                <img src='/images/name_icon.svg' alt='nameIcon' />
                <b>Name:</b> {farmer?.name}
              </div>
              <div className='horizontalDiv'>
                <img src='/images/descripcion_icon.svg' alt='descripcionIcon' />
                <b>ID:</b> #{farmer?.identifier}
              </div>
            </div>
          </div>

          <div className='column middle'>
            <div className='card2'>
              <div className='horizontalDiv'>
                <img src='/images/location_icon.svg' alt='locationIcon' />
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
                <img src='/images/water_icon.svg' alt='waterIcon' />
                <div>
                  <b>Hidryc regime:</b> {farmer?.hydricRegime}
                </div>
              </div>

              <div className='horizontalDiv'>
                <img src='/images/agriculture_icon.svg' alt='agricultureIcon' />
                <div>
                  <b>Agriculture technology:</b> {farmer?.agricultureTechnology}
                </div>
              </div>
            </div>
          </div>

          <div className='column right'>
            <div className='mapDetail' id='map' />
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
