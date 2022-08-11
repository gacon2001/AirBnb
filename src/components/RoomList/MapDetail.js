import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { ACCESS_POSITION_STACK, MAP_ACCESS } from "../../services/configURL";
import { dataMaps } from "./dataMap";
import { locationService } from "./../../services/locationService";

export default function MapDetail({ province }) {
  const [selected, setSelected] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  console.log("longitude", longitude, latitude);

  const handleChoose = (i) => {
    setSelected((state) => {
      return state.includes(i) ? state.filter((n) => n !== i) : [...state, i];
    });
  };
  const params = {
    access_key: ACCESS_POSITION_STACK,
    query: province,
  };

  useEffect(() => {
    locationService
      .getLocationLongLat(params)
      .then((res) => {
        // console.log("res", res.data);
        setLongitude(res.data.data[0].longitude);
        setLatitude(res.data.data[0].latitude);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: `${longitude ? longitude : 106.7}`,
          latitude: `${latitude ? latitude : 10.77}`,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/sonythirsty/cl639s1o2008u14ocu0y4u5ql"
        mapboxAccessToken={MAP_ACCESS}
      >
        {dataMaps.map((item, i) => {
          return (
            <Marker
              key={i}
              longitude={item.longitude}
              latitude={item.latitude}
              anchor="bottom"
            >
              <button>
                <button
                  className="px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer"
                  onClick={() => {
                    handleChoose(i);
                  }}
                >
                  <FontAwesomeIcon icon={faDollarSign} /> {item.price}
                </button>
                <div
                  className={`absolute w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block ${
                    selected.includes(i) ? "" : "hidden"
                  }`}
                >
                  <div className="relative z-[100] w-full h-24 mb-2">
                    <div className="block overflow-hidden object-cover absolute inset-0 ">
                      <img src={item.src} alt="" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">{item.name}</h2>
                  </div>
                </div>
              </button>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
