import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const categoryButtonSelectedStyle =
  "text-base mr-3 my-3 w-[96px] h-[43px] bg-sky-400 text-white border border-sky-400 rounded-lg";
const categoryButtonStyle = "text-base mr-3 w-[96px] h-[43px] bg-white text-sky-500 border border-sky-400 rounded-lg";

const CampaignCategoryBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("category")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("category", "방문");
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const categoryButtonHandler = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="w-full max-w-5xl">
      <button
        onClick={() => categoryButtonHandler("방문")}
        disabled={searchParams.get("category") === "방문"}
        className={searchParams.get("category") === "방문" ? categoryButtonSelectedStyle : categoryButtonStyle}
      >
        방문형
      </button>
      <button
        onClick={() => categoryButtonHandler("배송")}
        disabled={searchParams.get("category") === "배송"}
        className={searchParams.get("category") === "배송" ? categoryButtonSelectedStyle : categoryButtonStyle}
      >
        배송형
      </button>
      <button
        onClick={() => categoryButtonHandler("기자단")}
        disabled={searchParams.get("category") === "기자단"}
        className={searchParams.get("category") === "기자단" ? categoryButtonSelectedStyle : categoryButtonStyle}
      >
        기자단
      </button>
      <button
        onClick={() => categoryButtonHandler("기타")}
        disabled={searchParams.get("category") === "기타"}
        className={searchParams.get("category") === "기타" ? categoryButtonSelectedStyle : categoryButtonStyle}
      >
        기타
      </button>
    </div>
  );
};

export default CampaignCategoryBar;
