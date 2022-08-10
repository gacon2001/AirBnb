import "./roomListPage.scss";
import RoomList from "./../../components/RoomList/RoomList";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationService } from "../../services/locationService";

export default function RoomListPage() {
  const location = useLocation();
  const [locationInfo, setLocationInfo] = useState(location.state.locationInfo);

  const [nameOfPlace, setNameOfPlace] = useState("");

  const [listHotel, setListHotel] = useState([]);

  useEffect(() => {
    locationService
      .getRoomList(locationInfo)
      .then((res) => {
        // console.log("res", res);
        setListHotel(res.data);
        setNameOfPlace(res.data[0].locationId.name);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [locationInfo]);

  return (
    <>
      <main>
        <RoomList list={listHotel} placeName={nameOfPlace} />
      </main>
    </>
  );
}
