import {
  Children,
  useEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMap = () => {
  const [coordinates, setCoordinates] = useState<Array<string> | null>(null);
  const [click, setClick] = useState<google.maps.LatLng>();
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClick(e.latLng!);
    let roundCoords = [e.latLng!.lat().toFixed(3), e.latLng!.lng().toFixed(3)];
    setCoordinates(roundCoords);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <div className="flex flex-col text-center w-full h-full">
      <p className="text-xs text-gray-400">
        {coordinates ? `${coordinates[0]}, ${coordinates[1]}` : "-"}
      </p>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{
            flexGrow: "1",
            height: "100%",
            cursor: "crosshair",
            borderRadius: "2rem",
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

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new google.maps.Map(ref.current, { ...options }));
    }
  }, [ref, map, options]);

  // useDeepCompareEffectForMaps(() => {
  //   if (map) {
  //     console.log(options);
  //     map.setOptions(options);
  //   }
  // }, [map, options]);

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
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
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

    // remove marker from map on unmount
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

type deepCompare = {
  a?: any;
  b?: any;
};

// const deepCompareEqualsForMaps = createCustomEqual(
//   (deepEqual) => (a: any, b: any) => {
//     console.log(`a: ${a}`);
//     console.log(`b: ${b}`);
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }
//     return deepEqual(a, b);
//   }
// );

// function useDeepCompareMemoize(value: any) {
//   const ref = useRef();

//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value;
//   }

//   return ref.current;
// }

// function useDeepCompareEffectForMaps(
//   callback: React.EffectCallback,
//   dependencies: any[]
// ) {
//   useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

export default GoogleMap;
