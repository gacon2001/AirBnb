import "./roomListPage.scss";
import RoomList from "./../../components/RoomList/RoomList";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationService } from "../../services/locationService";
import { useParams } from "react-router-dom";

export default function RoomListPage() {
  let param = useParams();

  const [nameOfPlace, setNameOfPlace] = useState("");
  const [listHotel, setListHotel] = useState([]);
  const [longitude, setLongitude] = useState(param.long);
  const [latitude, setLatitude] = useState(param.lat);

  useEffect(() => {
    locationService
      .getRoomList(param.id)
      .then((res) => {
        setListHotel(res.data);
        setNameOfPlace(res.data[0].locationId.name);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [param.id]);

  return (
    <>
      <main>
        <RoomList
          list={listHotel}
          placeName={nameOfPlace}
          longitude={longitude}
          latitude={latitude}
        />
      </main>
    </>
  );
}
