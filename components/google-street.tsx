import React, {
  useRef,
  useEffect,
  forwardRef,
  useState,
  isValidElement,
  cloneElement,
  Children,
} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

type GameProps = {
  location: {
    lat: number;
    lng: number;
  };
};

const GoogleStreet: React.FC<GameProps> = ({ location }) => {
  return (
    <>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
        <View location={location} />
      </Wrapper>
    </>
  );
};

const View: React.FC<GameProps> = ({ location }) => {
  const panoRef = useRef<HTMLDivElement>(null);
  const [pano, setPano] = useState<google.maps.StreetViewPanorama>();
  const position = { ...location };

  const mapOptions = {
    clickToGo: true,
    disableDefaultUI: true,
    enableCloseButton: false,
    linksControl: true,
    panControl: false,
    position: position,
    pov: {
      heading: 0,
      pitch: 0,
    },
  };

  useEffect(() => {
    if (panoRef.current && !pano) {
      setPano(new google.maps.StreetViewPanorama(panoRef.current, mapOptions));
    }
  }, [panoRef, pano]);

  return (
    <>
      <div ref={panoRef} className="w-full h-full rounded-xl" />
    </>
  );
};

export default GoogleStreet;
