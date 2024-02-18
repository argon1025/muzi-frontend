import { useSearchParams } from "react-router-dom";
import dinner_queen_url from "../../resources/dinner-queen.png";
import { useEffect } from "react";

/**
 * 체험단 정보 제공자 목록
 */
const providerList: { provider: string; title: string; icon: JSX.Element }[] = [
  {
    provider: "all",
    title: "전체",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-full h-full text-gray-400 bg-gray-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    provider: "DINNER_QUEEN",
    title: "디너의 여왕",
    icon: <img src={dinner_queen_url} alt="dinner-queen" className="w-full h-full" />,
  },
];

/**
 * 버튼 스타일
 */
const selectedTextStyle = "mt-[21px] text-base text-sky-400 cursor-default";
const unSelectedTextStyle = "mt-[21px] text-base text-gray-500 cursor-pointer";
const selectedButtonStyle =
  "flex flex-col py-[30px] px-[16px] w-[111px] h-[164px] items-center justify-center cursor-default";
const unSelectedButtonStyle =
  "flex flex-col py-[30px] px-[16px] w-[111px] h-[164px] items-center justify-center cursor-pointer hover:border hover:border-sky-100 hover:bg-sky-50 rounded-[12px] transition duration-300 ease-in-out";

const CampaignProviderBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("provider")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("provider", "all");
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const providerButtonHandler = (provider: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("provider", provider);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="w-full max-w-5xl pt-[20px]">
      <h1 className="text-2xl font-bold">체험단 검색</h1>
      <div className="flex flex-row">
        {providerList.map(({ provider, title, icon }, index) => {
          const isSelected = searchParams.get("provider") === provider;
          return (
            <button
              className={isSelected ? selectedButtonStyle : unSelectedButtonStyle}
              onClick={() => providerButtonHandler(provider)}
              disabled={isSelected}
              key={index}
            >
              <div className="w-[64px] h-[64px] overflow-hidden rounded-[12px]">{icon}</div>
              <div>
                <h2 className={isSelected ? selectedTextStyle : unSelectedTextStyle}>{title}</h2>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignProviderBar;
