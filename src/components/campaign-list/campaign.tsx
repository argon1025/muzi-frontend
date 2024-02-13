
import { CampaignInfo } from "../../data-sources/type/muzi.data-source.type";
import dinner_queen_url from "../../resources/dinner-queen.png";

const getProvider = (provider:string) => {
    switch (provider) {
        case "DINNER_QUEEN":
            return (
            <div className="flex items-center">
                <div className="overflow-hidden rounded-md">
                    <img src={dinner_queen_url} alt="dinner-queen" className="w-5 h-5" />
                </div>
                <span className="text-base text-gray-400 ml-1">디너의 여왕</span>
            </div>);
        default:
            return "https://www.naver.com";
    }
}

const Campaign = (options:CampaignInfo) => {
    const { id, thumbnail, title, endedAt, applyCount, recruitCount, resourceProvider, originUrl} = options;
    let remainingDays = 0;
    if(endedAt){
        // endedAt에 9시간을 더해 KST로 변경
        const endedAtDate = new Date(endedAt);
        endedAtDate.setHours(endedAtDate.getHours() + 9);
        // 남은 일수 계산
        const now = new Date();
        const diff = endedAtDate.getTime() - now.getTime();
        remainingDays = Math.ceil(diff / (1000 * 3600 * 24));

    }

return (
    <div className="flex flex-col cursor-pointer" key={id} onClick={()=>window.open(originUrl)}>
        <div className="bg-fixed w-full h-60 overflow-hidden rounded-lg mb-5">
            <img src={thumbnail} alt="thumbnail" className=" w-full h-full object-cover bg-center" />
        </div>
        <div className="flex flex-col">
            {getProvider(resourceProvider)}
            <h1 className="text-xl font-bold my-1 truncate">{title}</h1>
            {remainingDays >= 0 ? <span className="text-lg font-bold">신청 종료까지<span className="text-sky-400"> {remainingDays}일 남음</span></span> : ''}
            <span className="text-lg text-gray-400 mt-1">{applyCount}명 신청 <span className="text-gray-300">| {recruitCount}명 선정</span></span>
        </div>
    </div>
);
};

export default Campaign;