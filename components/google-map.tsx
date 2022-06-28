import {
  Children,
  useEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

type GameProps = {
  onCoordsChange: any;
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const GoogleMap: React.FC<GameProps> = ({ onCoordsChange }) => {
  const [click, setClick] = useState<google.maps.LatLng>();
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClick(e.latLng!);
    let roundCoords = [e.latLng!.lat().toFixed(3), e.latLng!.lng().toFixed(3)];
    onCoordsChange(roundCoords);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div className="flex flex-col text-center w-full h-full border-4 border-green-400">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{
            flexGrow: "1",
            height: "100%",
            cursor: "crosshair",
          }}
          fullscreenControl={false} // remove the top-right button
          mapTypeControl={false} // remove the top-left buttons
          streetViewControl={false} // remove the pegman
          zoomControl={false} // remove the bottom-right buttons
        >
          {click ? <Marker position={click} /> : null}
        </Map>
      </Wrapper>
    </div>
  );
};

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new google.maps.Map(mapRef.current, { ...options }));
    }
  }, [mapRef, map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={mapRef} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default GoogleMap;
