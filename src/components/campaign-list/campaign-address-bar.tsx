import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import drop_down_enable from "../../resources/drop-down-enable.png";
const CampaignAddressBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActivated, setIsActivated] = useState<boolean>(false);

  useEffect(() => {
    if (!searchParams.get("address")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("address", "전체");
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const addressDropBoxHandler = () => {
    setIsActivated(!isActivated);
  };

  const addressButtonHandler = (address: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("address", address);
    setSearchParams(newSearchParams);
  };
  const addressList = ["전체", "대구", "서울", "부산", "인천", "광주", "경기", "강원", "대전", "제주", "충청"];

  return (
    <div className="flex flex-row mt-[20px] items-center cursor-pointer" onClick={() => addressDropBoxHandler()}>
      <h1 className="text-xl">{searchParams.get("address")}</h1>
      <div className="ml-[5px] h-[24px] w-[24px]">
        <img
          src={drop_down_enable}
          alt="drop_down_enable"
          className={`w-full h-full transition duration-150 ease-in-out ${isActivated ? "transform rotate-180" : ""}`}
        />
      </div>
      {isActivated && (
        <div className="absolute w-[241px] bg-white drop-shadow-md rounded-lg top-[420px] grid grid-cols-2 p-4 gap-5">
          {addressList.map((address, index) => {
            return (
              <button
                className={`px-[16px] w-full h-full text-left ${
                  searchParams.get("address") === address && "text-blue-400"
                }`}
                onClick={() => addressButtonHandler(address)}
                key={index}
              >
                {address}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampaignAddressBar;
