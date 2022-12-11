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
      <p className="title">
        Conservation works
      </p>
      <div className="carrousel">
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
