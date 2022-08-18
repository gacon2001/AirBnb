import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  // faDollarSign,
  faFlag,
  faShare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress, Modal, notification, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GalleryImg from "../../components/GalleryImg/GalleryImg";
import Loading from "../../components/Loading/Loading";
import RoomUtil from "../../components/RoomUtil/RoomUtil";
import "./roomDetail.scss";
import { locationService } from "./../../services/locationService";
import { differenceInCalendarDays, format } from "date-fns";
import useWindowDimensions from "../../HOOK/useWindowDimensions";

export default function RoomDetailPage() {
  let param = useParams();
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [roomItem, setRoomItem] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [visible, setVisible] = useState(false);
  let dateInfo = useSelector((state) => state.searchSlice.dateInfo);
  let option = useSelector((state) => state.searchSlice.option);
  let token = useSelector((state) => state.userSlice.userToken);

  let dataBooking = {
    roomId: roomItem._id,
    checkIn: dateInfo[0].startDate,
    checkOut: dateInfo[0].endDate,
  };
  // console.log("dataBooking", dataBooking);

  let roomUtil = {
    kitchen: roomItem.kitchen,
    pool: roomItem.pool,
    elevator: roomItem.elevator,
    hotTub: roomItem.hotTub,
    gym: roomItem.gym,
    wifi: roomItem.wifi,
    cableTV: roomItem.cableTV,
    dryer: roomItem.dryer,
    heating: roomItem.heating,
    indoorFireplace: roomItem.indoorFireplace,
  };

  useEffect(() => {
    locationService
      .getRoomDetail(param.id)
      .then((res) => {
        // console.log("res", res);
        setRoomItem(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    locationService
      .getRoomReview(param.id)
      .then((res) => {
        // console.log("res", res);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    let timeId = setTimeout(() => {
      setIsLoading(true);
    }, 1500);

    return () => {
      clearTimeout(timeId);
    };
  }, [param.id]);

  const countDown = () => {
    let secondsToGo = 1.5;

    const modal = Modal.success({
      centered: true,
      title: "Booking success",
    });

    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const handleBooking = () => {
    // setIsLoading(false);
    if (token) {
      locationService
        .postRoomBooking(token, dataBooking)
        .then((res) => {
          // console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
      countDown();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      openNotificationWithIcon(
        "warning",
        "Please login first",
        "Go back to login page"
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {!isLoading && <Loading />}
      {isLoading && (
        <main>
          <div className="xl:w-[1120px] container mx-auto px-3">
            <div className="pt-6">
              <h2 className="text-2xl font-semibold text-left">
                {roomItem.name}
              </h2>
              <div className="flex flex-row justify-between pt-2">
                <span className="underline cursor-pointer font-semibold text-sm text-left">
                  {roomItem.locationId.name} - {roomItem.locationId.province} -{" "}
                  {roomItem.locationId.country}
                </span>
                <span>
                  <span className="mx-2 rounded hover:bg-gray-200 hover:opacity-75 cursor-pointer p-2 hover:underline">
                    <FontAwesomeIcon icon={faShare} className="mr-2" />
                    Share
                  </span>
                  <span className="mx-2 rounded hover:bg-gray-200 hover:opacity-75 cursor-pointer p-2 hover:underline">
                    <FontAwesomeIcon icon={faHeart} className="mr-2" />
                    Save
                  </span>
                </span>
              </div>
            </div>
            <div className="gallery w-full pt-6 h-96 lg:h-[600px] ">
              <GalleryImg pic={roomItem.image} />
            </div>
            <div className="roomDetail flex flex-col lg:flex-row pt-14 border-b">
              <div className="left w-full lg:w-3/5 pr-4">
                <div className="left1 flex flex-row justify-between items-center pb-6 border-b ">
                  <div className="text-left">
                    <h2 className="text-2xl font-semibold mb-2">
                      Entire rental unit hosted by Sorainn
                    </h2>
                    <span className="text-lg font-light text-gray-700  ">
                      <span> {roomItem.guests} guests </span> •{" "}
                      <span> {roomItem.bath} bedroom </span> •
                      <span> {roomItem.bedRoom} bed </span> •{" "}
                      <span> {roomItem.bath} bath</span>
                    </span>
                  </div>
                  <div className="w-20 h-20 object-cover object-center rounded-full overflow-hidden ">
                    <img
                      src={`https://i.pravatar.cc/150?u=${roomItem._id}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="left2 flex flex-col py-6 border-b ">
                  <div className="flex flex-row items-center py-3">
                    <div className="icon w-1/12 flex justify-center items-center text-2xl text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="40"
                        height="40"
                      >
                        <g id="Layer_93" data-name="Layer 93">
                          <path d="M58.88,29.12l-26-26a1.24,1.24,0,0,0-1.76,0l-26,26a1.22,1.22,0,0,0-.37.88V57a4.15,4.15,0,0,0,4,4.25H55.21a4.15,4.15,0,0,0,4-4.25V30A1.22,1.22,0,0,0,58.88,29.12ZM24.25,58.75V40A1.76,1.76,0,0,1,26,38.25H38A1.76,1.76,0,0,1,39.75,40V58.75ZM56.75,57a1.66,1.66,0,0,1-1.54,1.75h-13V40A4.26,4.26,0,0,0,38,35.75H26A4.26,4.26,0,0,0,21.75,40V58.75h-13A1.66,1.66,0,0,1,7.25,57V30.52L32,5.77,56.75,30.52Z" />
                        </g>
                      </svg>
                    </div>
                    <div className="w-11/12 content text-left">
                      <h3 className="text-xl font-semibold mb-1">
                        Toàn bộ nhà
                      </h3>
                      <span className="tracking-wide font-light text-gray-700 ">
                        Bạn sẽ có chung cư cao cấp cho riêng mình
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center py-3">
                    <div className="icon w-1/12 flex justify-center items-center text-2xl text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M14.564 40.259C14.1811 40.2568 13.8029 40.1748 13.4535 40.0181C13.1042 39.8613 12.7914 39.6334 12.5352 39.3489C12.2789 39.0643 12.0849 38.7294 11.9656 38.3656C11.8462 38.0018 11.8041 37.617 11.842 37.236L12.759 28.188L6.7 21.405C6.38126 21.0473 6.16176 20.6123 6.06337 20.1434C5.96498 19.6745 5.99112 19.188 6.1392 18.7324C6.28728 18.2767 6.55212 17.8678 6.90737 17.5463C7.26261 17.2248 7.69587 17.002 8.164 16.9L17.053 14.975L21.5 7.331C21.7544 6.89439 22.1189 6.53211 22.557 6.28032C22.9952 6.02853 23.4917 5.89603 23.997 5.89603C24.5023 5.89603 24.9988 6.02853 25.437 6.28032C25.8751 6.53211 26.2396 6.89439 26.494 7.331L30.944 14.972L39.834 16.897C40.3029 16.9984 40.7369 17.221 41.0929 17.5426C41.4488 17.8642 41.7142 18.2735 41.8626 18.7297C42.0109 19.1859 42.037 19.673 41.9383 20.1424C41.8396 20.6119 41.6195 21.0472 41.3 21.405L35.24 28.188L36.157 37.236C36.2054 37.7132 36.1277 38.1948 35.9317 38.6326C35.7357 39.0704 35.4283 39.4492 35.0402 39.7311C34.6521 40.0129 34.1968 40.188 33.7198 40.2389C33.2428 40.2898 32.7609 40.2147 32.322 40.021L24 36.354L15.677 40.021C15.3268 40.1775 14.9476 40.2586 14.564 40.259ZM24 7.9C23.8443 7.89834 23.691 7.93835 23.5559 8.01589C23.4209 8.09343 23.3091 8.20568 23.232 8.341L18.559 16.36C18.4892 16.4799 18.3951 16.584 18.2829 16.6656C18.1706 16.7472 18.0426 16.8046 17.907 16.834L8.587 18.853C8.45979 18.8799 8.34188 18.9398 8.24509 19.0266C8.1483 19.1135 8.07603 19.2242 8.03552 19.3478C7.99501 19.4713 7.98768 19.6034 8.01427 19.7306C8.04085 19.8579 8.10042 19.976 8.187 20.073L14.541 27.184C14.6333 27.2874 14.7032 27.409 14.746 27.5408C14.7889 27.6727 14.8039 27.812 14.79 27.95L13.83 37.438C13.817 37.5671 13.8381 37.6974 13.8912 37.8158C13.9443 37.9342 14.0275 38.0366 14.1326 38.1128C14.2376 38.189 14.3608 38.2364 14.4899 38.2501C14.6189 38.2638 14.7493 38.2434 14.868 38.191L23.6 34.347C23.7269 34.2907 23.8642 34.2616 24.003 34.2616C24.1418 34.2616 24.2791 34.2907 24.406 34.347L33.132 38.191C33.2507 38.2434 33.3811 38.2638 33.5101 38.2501C33.6392 38.2364 33.7624 38.189 33.8674 38.1128C33.9725 38.0366 34.0557 37.9342 34.1088 37.8158C34.1619 37.6974 34.183 37.5671 34.17 37.438L33.21 27.95C33.1961 27.812 33.2111 27.6727 33.254 27.5408C33.2968 27.409 33.3667 27.2874 33.459 27.184L39.813 20.072C39.8993 19.975 39.9587 19.857 39.9851 19.7298C40.0116 19.6027 40.0042 19.4708 39.9637 19.3474C39.9232 19.224 39.851 19.1134 39.7544 19.0267C39.6577 18.9399 39.54 18.88 39.413 18.853L30.092 16.834C29.9564 16.8046 29.8284 16.7472 29.7161 16.6656C29.6039 16.584 29.5098 16.4799 29.44 16.36L24.768 8.337C24.6904 8.20243 24.5784 8.09098 24.4434 8.01416C24.3084 7.93734 24.1553 7.89794 24 7.9V7.9Z"
                          fill="black"
                        />
                        <path
                          d="M24 46C23.7348 46 23.4804 45.8946 23.2929 45.7071C23.1054 45.5196 23 45.2652 23 45V41C23 40.7348 23.1054 40.4804 23.2929 40.2929C23.4804 40.1054 23.7348 40 24 40C24.2652 40 24.5196 40.1054 24.7071 40.2929C24.8946 40.4804 25 40.7348 25 41V45C25 45.2652 24.8946 45.5196 24.7071 45.7071C24.5196 45.8946 24.2652 46 24 46Z"
                          fill="black"
                        />
                        <path
                          d="M4.028 31.489C3.78993 31.489 3.55969 31.404 3.37867 31.2493C3.19766 31.0947 3.07775 30.8806 3.0405 30.6454C3.00326 30.4103 3.05113 30.1696 3.17551 29.9666C3.29988 29.7636 3.4926 29.6116 3.719 29.538L7.519 28.302C7.76715 28.2335 8.03217 28.2632 8.2589 28.3852C8.48563 28.5071 8.6566 28.7118 8.73623 28.9566C8.81586 29.2014 8.79801 29.4675 8.68639 29.6995C8.57477 29.9315 8.37799 30.1115 8.137 30.202L4.337 31.438C4.23739 31.4714 4.13307 31.4886 4.028 31.489V31.489Z"
                          fill="black"
                        />
                        <path
                          d="M43.972 31.489C43.867 31.4893 43.7627 31.4727 43.663 31.44L39.863 30.204C39.7328 30.168 39.6112 30.106 39.5056 30.0218C39.4 29.9375 39.3125 29.8327 39.2485 29.7137C39.1846 29.5947 39.1453 29.464 39.1333 29.3294C39.1212 29.1949 39.1365 29.0593 39.1783 28.9308C39.2201 28.8023 39.2875 28.6836 39.3764 28.5819C39.4653 28.4802 39.574 28.3976 39.6957 28.339C39.8174 28.2804 39.9498 28.2471 40.0848 28.2411C40.2197 28.2351 40.3545 28.2565 40.481 28.304L44.281 29.54C44.5074 29.6136 44.7001 29.7656 44.8245 29.9686C44.9489 30.1716 44.9967 30.4123 44.9595 30.6474C44.9223 30.8826 44.8023 31.0967 44.6213 31.2513C44.4403 31.406 44.2101 31.4909 43.972 31.491V31.489Z"
                          fill="black"
                        />
                        <path
                          d="M33.991 11.247C33.8066 11.2468 33.6259 11.1957 33.4688 11.0993C33.3116 11.0028 33.1842 10.8648 33.1006 10.7005C33.017 10.5362 32.9804 10.3519 32.995 10.1681C33.0095 9.98433 33.0746 9.80814 33.183 9.659L35.534 6.423C35.6901 6.20844 35.925 6.06467 36.1871 6.02332C36.4492 5.98197 36.7169 6.04642 36.9315 6.2025C37.1461 6.35858 37.2898 6.5935 37.3312 6.85559C37.3725 7.11767 37.3081 7.38544 37.152 7.6L34.8 10.834C34.7073 10.9618 34.5857 11.0659 34.4451 11.1377C34.3045 11.2094 34.1489 11.2469 33.991 11.247Z"
                          fill="black"
                        />
                        <path
                          d="M14.009 11.247C13.851 11.2471 13.6951 11.2097 13.5543 11.1379C13.4135 11.0661 13.2918 10.962 13.199 10.834L10.848 7.6C10.6921 7.38544 10.6277 7.11772 10.6692 6.85573C10.7106 6.59374 10.8544 6.35895 11.069 6.203C11.2836 6.04706 11.5513 5.98273 11.8133 6.02418C12.0753 6.06562 12.3101 6.20944 12.466 6.424L14.817 9.66C14.9254 9.80913 14.9905 9.98533 15.005 10.1691C15.0196 10.3529 14.983 10.5372 14.8994 10.7015C14.8158 10.8658 14.6884 11.0038 14.5312 11.1003C14.3741 11.1967 14.1934 11.2478 14.009 11.248V11.247Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="w-11/12 content text-left">
                      <h3 className="text-xl font-semibold mb-1">
                        Vệ sinh tăng cường
                      </h3>
                      <span className="tracking-wide font-light text-gray-700 ">
                        Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                        cường 5 bước của Airbnb
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center py-3">
                    <div className="icon w-1/12 flex justify-center items-center text-2xl text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                      >
                        <g id="Layer_1">
                          <path d="M38.594,13.356l0.468-4.477L34.95,7.05l-1.829-4.112l-4.477,0.467L25,0.765l-3.644,2.641l-4.477-0.468L15.05,7.05   l-4.112,1.829l0.467,4.477L8.765,17l2.641,3.644l-0.468,4.477l4.113,1.829L16,29.085v19.72l9-5.625l9,5.625V29.085l0.95-2.135   l4.112-1.829l-0.467-4.477L41.235,17L38.594,13.356z M25,40.821l-7,4.375V30.945l3.356-0.35L25,33.235l3.644-2.641L32,30.945v14.25   L25,40.821z M36.922,23.883l-3.487,1.552l-1.552,3.487l-3.793-0.396L25,30.765l-3.09-2.239l-3.793,0.396l-1.552-3.487l-3.487-1.552   l0.396-3.793L11.235,17l2.239-3.09l-0.396-3.793l3.487-1.552l1.552-3.487l3.793,0.396L25,3.235l3.09,2.239l3.793-0.396l1.552,3.487   l3.487,1.552l-0.396,3.793L38.765,17l-2.239,3.09L36.922,23.883z" />
                          <path d="M25,7c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S30.514,7,25,7z M25,25c-4.411,0-8-3.589-8-8s3.589-8,8-8   s8,3.589,8,8S29.411,25,25,25z" />
                        </g>
                        <g></g>
                      </svg>
                    </div>
                    <div className=" w-11/12 content text-left">
                      <h3 className="text-xl font-semibold mb-1">
                        Chủ nhà Siêu cấp
                      </h3>
                      <span className="tracking-wide font-light text-gray-700 ">
                        Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được
                        đánh giá cao và là những người cam kết mang lại quãng
                        thời gian tuyệt vời cho khách
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center py-3">
                    <div className="icon w-1/12 flex justify-center items-center text-2xl text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-calendar"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className="w-11/12 content text-left">
                      <h3 className="text-xl font-semibold mb-1">
                        Miễn phí hủy trong 48 giờ
                      </h3>
                      <span className="tracking-wide font-light text-gray-700 "></span>
                    </div>
                  </div>
                </div>
                <div className="left3 py-6 border-b text-left ">
                  <div className="h-44 w-full overflow-hidden mb-3 text-ellipsis whitespace-normal">
                    <p className="font-light tracking-wide text-gray-700 mt-2 text-justify">
                      {roomItem.description}
                    </p>
                  </div>
                  <span className="hover:underline cursor-pointer">
                    Show more
                    <FontAwesomeIcon icon={faAngleRight} className=" ml-2" />
                  </span>
                </div>
                <div className="left4 py-6 text-left ">
                  <RoomUtil render={roomUtil} />
                </div>
              </div>
              <div className="right w-full lg:w-2/5 lg:h-[1190px] lg:ml-[8.3%] relative">
                {width < 1024 ? (
                  <div className="border payment border-gray-900 rounded-xl shadow-2xl p-3 px-8">
                    <div className="buttonReserve py-4">
                      <button
                        className="w-full py-5 rounded-xl text-xl font-bold text-white tracking-wider"
                        onClick={() => {
                          showDrawer();
                        }}
                      >
                        Reserve
                      </button>
                    </div>
                    <Drawer
                      title="Payment confirm"
                      placement="right"
                      closable={false}
                      onClose={onClose}
                      visible={visible}
                      width="450"
                    >
                      <div className="sticky top-0 w-full">
                        <div className="payment text-[#222222] text-base font-normal leading-5 text-left">
                          <div className="border border-gray-900 rounded-xl shadow-2xl p-8">
                            <h2 className="text-2xl font-semibold pt-2 pb-6">
                              {/* <FontAwesomeIcon icon={faDollarSign} />  */}
                              {`VND ${roomItem.price}`}
                              <span className="text-lg font-light text-gray-700 ml-2">
                                /night
                              </span>
                            </h2>
                            <div className="border border-gray-900 rounded-xl">
                              <div className="date flex flex-col">
                                <div className="checkIn w-full pl-6 py-4  border-b border-gray-900">
                                  <h4 className="text-sm font-bold pb-2">
                                    CHECK IN
                                  </h4>
                                  <span>{`${format(
                                    new Date(dateInfo[0].startDate),
                                    "dd/MM/yyyy"
                                  )}`}</span>
                                </div>
                                <div className="checkOut w-full pl-6 py-4 ">
                                  <h4 className="text-sm font-bold pb-2">
                                    CHECK OUT
                                  </h4>
                                  <span>{`${format(
                                    new Date(dateInfo[0].endDate),
                                    "dd/MM/yyyy"
                                  )}`}</span>
                                </div>
                              </div>
                              <div className="guest pl-6 py-4 border-t border-gray-900">
                                <h4 className="text-sm font-bold pb-2">
                                  GUESTS
                                </h4>
                                <span>{`${option.adult} adult - ${option.children} children - ${option.pet} pet`}</span>
                              </div>
                            </div>
                            <div className="buttonReserve py-4">
                              <button
                                className="w-full py-5 rounded-xl text-xl font-bold text-white tracking-wider bg-[#e31c5f]"
                                onClick={() => {
                                  handleBooking();
                                }}
                              >
                                Reserve
                              </button>
                            </div>
                            <div className=" text-center pb-2">
                              <span className="text-base font-light">
                                You won't be charged yet
                              </span>
                            </div>
                            <div className="py-4 border-b">
                              <div className="flex flex-col justify-between text-lg pb-3">
                                <span className="underline">
                                  <span>{`VND ${roomItem.price}`} </span> x{" "}
                                  <span>
                                    {" "}
                                    {differenceInCalendarDays(
                                      new Date(dateInfo[0].endDate),
                                      new Date(dateInfo[0].startDate)
                                    )}{" "}
                                  </span>{" "}
                                  <span>nights</span>
                                </span>
                                <span className="text-right font-semibold">
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="mr-3"
                                  />
                                  VND{" "}
                                  <span>{`${
                                    roomItem.price *
                                    differenceInCalendarDays(
                                      new Date(dateInfo[0].endDate),
                                      new Date(dateInfo[0].startDate)
                                    )
                                  }`}</span>
                                </span>
                              </div>
                              <div className="flex flex-col justify-between text-lg pb-3">
                                <span className="underline">
                                  <span>Service fee</span>
                                </span>
                                <span className="text-right font-semibold">
                                  <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="mr-3"
                                  />
                                  VND <span>500000</span>
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between text-lg pt-5">
                              <span className="font-bold">
                                <span>Total before taxs</span>
                              </span>
                              <span className="text-right font-bold">
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                  className="mr-3"
                                />
                                VND{" "}
                                <span>{`${
                                  roomItem.price *
                                    differenceInCalendarDays(
                                      new Date(dateInfo[0].endDate),
                                      new Date(dateInfo[0].startDate)
                                    ) +
                                  500000
                                }`}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="note underline cursor-pointer font-semibold text-sm mt-8">
                          <FontAwesomeIcon icon={faFlag} className="mr-5" />{" "}
                          Report this listing
                        </div>
                      </div>
                    </Drawer>
                  </div>
                ) : (
                  <div className="sticky top-0 w-full pb-12">
                    <div className="payment text-[#222222] text-base font-normal leading-5 text-left">
                      <div className="border border-gray-900 rounded-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-semibold pt-2 pb-6">
                          {/* <FontAwesomeIcon icon={faDollarSign} />  */}
                          {`VND ${roomItem.price}`}
                          <span className="text-lg font-light text-gray-700 ml-2">
                            /night
                          </span>
                        </h2>
                        <div className="border border-gray-900 rounded-xl">
                          <div className="date flex ">
                            <div className="checkIn w-1/2 pl-6 py-4  border-r border-gray-900">
                              <h4 className="text-sm font-bold pb-2">
                                CHECK IN
                              </h4>
                              <span>{`${format(
                                new Date(dateInfo[0].startDate),
                                "dd/MM/yyyy"
                              )}`}</span>
                            </div>
                            <div className="checkOut w-1/2 pl-6 py-4 ">
                              <h4 className="text-sm font-bold pb-2">
                                CHECK OUT
                              </h4>
                              <span>{`${format(
                                new Date(dateInfo[0].endDate),
                                "dd/MM/yyyy"
                              )}`}</span>
                            </div>
                          </div>
                          <div className="guest pl-6 py-4 border-t border-gray-900">
                            <h4 className="text-sm font-bold pb-2">GUESTS</h4>
                            <span>{`${option.adult} adult - ${option.children} children - ${option.pet} pet`}</span>
                          </div>
                        </div>
                        <div className="buttonReserve py-4">
                          <button
                            className="w-full py-5 rounded-xl text-xl font-bold text-white tracking-wider"
                            onClick={() => {
                              handleBooking();
                            }}
                          >
                            Reserve
                          </button>
                        </div>
                        <div className=" text-center pb-2">
                          <span className="text-base font-light">
                            You won't be charged yet
                          </span>
                        </div>
                        <div className="py-4 border-b">
                          <div className="flex justify-between text-lg pb-3">
                            <span className="underline">
                              <span>{`VND ${roomItem.price}`} </span> x{" "}
                              <span>
                                {" "}
                                {differenceInCalendarDays(
                                  new Date(dateInfo[0].endDate),
                                  new Date(dateInfo[0].startDate)
                                )}{" "}
                              </span>{" "}
                              <span>nights</span>
                            </span>
                            <span>
                              VND{" "}
                              <span>{`${
                                roomItem.price *
                                differenceInCalendarDays(
                                  new Date(dateInfo[0].endDate),
                                  new Date(dateInfo[0].startDate)
                                )
                              }`}</span>
                            </span>
                          </div>
                          <div className="flex justify-between text-lg pb-3">
                            <span className="underline">
                              <span>Service fee</span>
                            </span>
                            <span>
                              VND <span>500000</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-lg pt-5">
                          <span className="font-bold">
                            <span>Total before taxs</span>
                          </span>
                          <span>
                            VND{" "}
                            <span>{`${
                              roomItem.price *
                                differenceInCalendarDays(
                                  new Date(dateInfo[0].endDate),
                                  new Date(dateInfo[0].startDate)
                                ) +
                              500000
                            }`}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="note underline cursor-pointer font-semibold text-sm mt-8">
                      <FontAwesomeIcon icon={faFlag} className="mr-5" /> Report
                      this listing
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="comment w-full py-6 border-b text-left">
              <div className="top">
                <h2 className="text-2xl font-semibold mb-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-[#ff385c] mr-2"
                    />
                  </span>
                  4,83 (18 reviews)
                </h2>
                <div className="stats flex flex-col flex-wrap h-52 mr-5">
                  <div className="w-1/3 flex flex-row justify-between py-4 ">
                    <span>Mức độ sạch sẽ</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.8 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.8
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-row justify-between py-4">
                    <span>Giá trị</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.7 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.7
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-row justify-between py-4">
                    <span>Liên lạc</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.9 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.9
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-row justify-between py-4">
                    <span>Nhận phòng</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.7 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.7
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-row justify-between py-4">
                    <span>Độ chính xác</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.9 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.9
                    </div>
                  </div>
                  <div className="w-1/3 flex flex-row justify-between py-4">
                    <span>Vị trí</span>
                    <div className="w-1/2 flex">
                      <Progress
                        percent={(4.6 / 5) * 100}
                        size="small"
                        showInfo={false}
                        strokeColor={{
                          "0%": "#717171",
                          "100%": "#717171",
                        }}
                        className="mr-2"
                      />
                      4.6
                    </div>
                  </div>
                </div>
              </div>
              {reviewList.length ? (
                <div className="bottom flex flex-col flex-wrap h-[600px]">
                  {reviewList.map((item, i) => {
                    if (i < 6) {
                      return (
                        <div className="w-1/2 h-40 pr-14 my-5" key={i}>
                          <div className="reviewTop flex flex-row items-center mb-5">
                            <div className="avatar w-16 h-16 object-cover object-center rounded-full overflow-hidden mr-4">
                              <img
                                src={
                                  item.userId
                                    ? item.userId.avatar
                                    : `https://i.pravatar.cc/150?u=${item._id}`
                                }
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <div className="reviewer text-left">
                              <h3 className="text-lg font-semibold">
                                {item.userId ? item.userId.name : "Random Name"}
                              </h3>
                              <span className="font-light text-gray-700">
                                {`Month ${format(
                                  new Date(item.created_at),
                                  "M"
                                )} year ${format(
                                  new Date(item.created_at),
                                  "yyyy"
                                )}`}
                              </span>
                            </div>
                          </div>
                          <div className="reviewBottom h-16 text-ellipsis overflow-hidden whitespace-normal ">
                            <span>{item.content}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                ""
              )}
              <div className="mt-4 pb-3">
                {reviewList.length ? (
                  <button>
                    <span className="py-3 px-9 bg-white font-semibold text-sm rounded-md border border-gray-800 ">
                      Show all reivew
                    </span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
