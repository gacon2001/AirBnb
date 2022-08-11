import "./roomListPage.scss";
import RoomList from "./../../components/RoomList/RoomList";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { locationService } from "../../services/locationService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function RoomListPage() {
  let param = useParams();

  const locationInfo = useSelector((state) => state.searchSlice.locationInfo);

  const [nameOfPlace, setNameOfPlace] = useState("");
  const [province, setProvince] = useState("");

  const [listHotel, setListHotel] = useState([]);

  useEffect(() => {
    locationService
      .getRoomList(param.id)
      .then((res) => {
        setListHotel(res.data);
        setNameOfPlace(res.data[0].locationId.name);
        setProvince(res.data[0].locationId.province);
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
          province={province}
        />
      </main>
    </>
  );
}
