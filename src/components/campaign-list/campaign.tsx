import { CampaignInfo } from "../../data-sources/type/muzi.data-source.type";
import dinner_queen_url from "../../resources/dinner-queen.png";
import { DateTime } from "luxon";

const getProvider = (provider: string) => {
  switch (provider) {
    case "DINNER_QUEEN":
      return (
        <div className="flex items-center">
          <div className="overflow-hidden rounded-md">
            <img src={dinner_queen_url} alt="dinner-queen" className="w-5 h-5" />
          </div>
          <span className="text-sm text-gray-400 ml-1">디너의 여왕</span>
        </div>
      );
    default:
      return "https://www.naver.com";
  }
};

const Campaign = (options: CampaignInfo) => {
  const { id, thumbnail, title, endedAt, applyCount, recruitCount, resourceProvider, originUrl } = options;
  let remainingDays = 0;
  if (endedAt) {
    // endedAt에 9시간을 더해 KST로 변경
    const endedAtKST = DateTime.fromISO(endedAt).plus({ hours: 9 });
    // 몇일 남았는지 계산
    remainingDays = Math.ceil(endedAtKST.diffNow("days").days);
  }

  return (
    <div className="flex flex-col cursor-pointer" key={id} onClick={() => window.open(originUrl)}>
      <div className="bg-fixed w-full h-60 overflow-hidden rounded-lg mb-5">
        <img src={thumbnail} alt="thumbnail" className=" w-full h-full object-cover bg-center" />
      </div>
      <div className="flex flex-col">
        {getProvider(resourceProvider)}
        <h1 className="text-lg font-semibold my-1 truncate">{title}</h1>
        {remainingDays >= 0 ? (
          <span className="text-base font-semibold">
            신청 종료까지<span className="text-sky-400"> {remainingDays}일 남음</span>
          </span>
        ) : (
          ""
        )}
        <span className="text-base text-gray-400 mt-1">
          {applyCount}명 신청 <span className="text-gray-300">| {recruitCount}명 선정</span>
        </span>
      </div>
    </div>
  );
};

export default Campaign;
