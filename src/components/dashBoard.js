import { map } from "lodash";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import { useWorks } from "../context/worksContext";
import Card from "./card";

function DashBoard() {
  const { works } = useWorks();
  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
  };

  return (
    <>
      <div
        style={{
          paddingLeft: "30px",
          paddingBottom: "30px",
          fontWeight: "bold",
          fontSize: "2em",
          color: "#0055B8",
        }}>
        Conservation works
      </div>
      <div
        style={{
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}></div>
      <div style={{ paddingBottom: "20px" }}>
        <AliceCarousel
          mouseTracking
          items={map(works, (item) => (
            <Card work={item} />
          ))}
          responsive={responsive}
          disableDotsControls
          disableSlideInfo
          disableButtonsControls
        />
      </div>
    </>
  );
}

export default DashBoard;
