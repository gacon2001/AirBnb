import "./roomListPage.scss";
import RoomList from "./../../components/RoomList/RoomList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationService } from "../../services/locationService";
import { useSelector } from "react-redux";

export default function RoomListPage() {
  let param = useParams();
  console.log("param", param.id);

  const locationInfo = useSelector((state) => state.searchSlice.locationInfo);

  const [nameOfPlace, setNameOfPlace] = useState("");
  const [province, setProvince] = useState("");

  const [listHotel, setListHotel] = useState([]);

  useEffect(() => {
    locationService
      .getRoomList(locationInfo)
      .then((res) => {
        setListHotel(res.data);
        setNameOfPlace(res.data[0].locationId.name);
        setProvince(res.data[0].locationId.province);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [locationInfo]);

  return (
    <>
      <main>
        <RoomList
          list={listHotel}
          placeName={nameOfPlace}
          province={province}
        />
      </main>
    </>
  );
}
