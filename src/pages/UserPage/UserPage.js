import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NavbarSmall from "./../../components/Navbar/NavbarSmall";
import avatarPic from "../../assets/user/default-avatar-bpthumb.png";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { message, Upload } from "antd";
import { BASE_URL, TOKEN_CYBERSOFT } from "../../services/configURL";
import { userService } from "../../services/userService";

export default function UserPage() {
  let userInfo = useSelector((state) => state.userSlice.userInfo);
  let token = useSelector((state) => state.userSlice.userToken);
  let srcAvt = useSelector((state) => state.userSlice.userAvatar);
  const [userReload, setUserReload] = useState(null);
  const [srcAvatar, setSrcAvatar] = useState(srcAvt);
  //   console.log("userInfo", userInfo, token, srcAvatar);

  const props = {
    name: "avatar",
    action: `${BASE_URL}/api/users/upload-avatar`,
    headers: {
      token: token,
      tokenByClass: TOKEN_CYBERSOFT,
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setTimeout(() => {
          userService
            .getUserInfo(userInfo._id)
            .then((res) => {
              //   console.log("res", res);
              setUserReload(res.data);
              setSrcAvatar(res.data.avatar);
            })
            .catch((err) => {
              console.log("err", err);
            });
        }, 1000);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <NavbarSmall type="user" />
      <div className="lg:w-[1120px] container mx-auto flex flex-col md:flex-row pt-14 ">
        <div className="left w-80 h-max mx-auto md:mr-[8.3%] relative">
          <div className="sticky top-0 w-full pb-12">
            <div className=" text-[#222222] text-base font-normal leading-5 text-left">
              <div className="border border-gray-500 rounded-xl shadow-2xl p-8">
                <div className="flex items-center justify-center">
                  <div className="w-44 h-44 bg-white rounded-full overflow-hidden border">
                    {!userReload ? (
                      <img
                        // src={srcAvatar ? userInfo.avatar : avatarPic}
                        src={srcAvatar}
                        alt=""
                        className="object-cover object-center w-full h-full"
                      />
                    ) : (
                      <img
                        src={userReload.avatar}
                        alt=""
                        className="object-cover object-center w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <div className="text-center text-sm font-semibold w-full">
                  <Upload {...props}>
                    <button className="w-max underline mt-2 cursor-pointer ml-3">
                      Cập nhật ảnh
                    </button>
                  </Upload>
                </div>
                <div className="pt-5 pb-2">
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
                </div>
                <h4 className="font-bold">Xác minh danh tính</h4>
                <p className="font-light text-sm my-3">
                  Xác thực danh tính của bạn với huy hiệu xác minh danh tính
                </p>
                <div className="pt-4 pb-4 mb-6">
                  <button>
                    <span className="py-2 px-7 bg-white font-semibold text-sm rounded-md border border-gray-800 ">
                      Nhận huy hiệu
                    </span>
                  </button>
                </div>

                <div className="py-6 border-t">
                  <h3 className=" text-lg mb-5 font-bold">
                    <span>Đã xác nhận</span>
                  </h3>
                  <div className="text-sm">
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>Địa chỉ email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right w-3/5 pl-4 mx-auto">
          <div className="left1 flex flex-row justify-between items-center pb-6 border-b ">
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">
                Xin chào, tôi là {userInfo ? userInfo.name : "Admin"}
              </h2>
              <p className="text-sm font-light text-gray-700 my-4 ">
                <span> Bắt đầu tham gia vào 2021 </span>
              </p>
              <div className="py-5 overflow-x-auto relative">
                {userInfo ? (
                  <table className="table-auto w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                      <tr>
                        <th scope="col" className="py-3 px-9">
                          Mục
                        </th>
                        <th scope="col" className="py-3 px-9">
                          Thông tin
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Tên
                        </th>
                        <td className="py-4 px-9">{userInfo.name}</td>
                      </tr>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Email
                        </th>
                        <td className="py-4 px-9">{userInfo.email}</td>
                      </tr>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Giới tính
                        </th>
                        <td className="py-4 px-9">
                          {userInfo.gender ? "Nam" : "Nữ"}
                        </td>
                      </tr>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Điện thoại
                        </th>
                        <td className="py-4 px-9">{userInfo.phone}</td>
                      </tr>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Ngày sinh
                        </th>
                        <td className="py-4 px-9">
                          {format(new Date(userInfo.birthday), "dd/MM/yyyy")}
                        </td>
                      </tr>
                      <tr className="bg-white border-b  ">
                        <th
                          scope="row"
                          className="py-4 px-9 font-medium text-gray-900 whitespace-nowrap "
                        >
                          Địa chỉ
                        </th>
                        <td className="py-4 px-9">{userInfo.address}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
              </div>
              <div className="text-sm font-semibold w-full">
                <button className="w-max underline mt-2">
                  Chỉnh sửa hồ sơ
                </button>
              </div>
              <div className="mt-6 text-lg font-semibold">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                0 đánh giá
              </div>
            </div>
          </div>
          <div className="left2 py-8 border-b ">
            <div className="text-sm text-left font-semibold w-full">
              <button className="w-max underline">Đánh giá của bạn</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
