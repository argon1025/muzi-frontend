import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
    <div className="w-full max-w-5xl pt-[20px]">
      <button
        onClick={() => categoryButtonHandler("방문")}
        disabled={searchParams.get("category") === "방문"}
        className={`text-xl mr-4 underline-offset-8 ${
          searchParams.get("category") === "방문" && "text-sky-400 underline decoration-sky-400"
        }`}
      >
        방문형
      </button>
      <button
        onClick={() => categoryButtonHandler("배송")}
        disabled={searchParams.get("category") === "배송"}
        className={`text-xl mr-4 underline-offset-8 ${
          searchParams.get("category") === "배송" && "text-sky-400 underline decoration-sky-400"
        }`}
      >
        배송형
      </button>
      <button
        onClick={() => categoryButtonHandler("기자단")}
        disabled={searchParams.get("category") === "기자단"}
        className={`text-xl mr-4 underline-offset-8 ${
          searchParams.get("category") === "기자단" && "text-sky-400 underline decoration-sky-400"
        }`}
      >
        기자단
      </button>
      <button
        onClick={() => categoryButtonHandler("기타")}
        disabled={searchParams.get("category") === "기타"}
        className={`text-xl mr-4 underline-offset-8 ${
          searchParams.get("category") === "기타" && "text-sky-400 underline decoration-sky-400"
        }`}
      >
        기타
      </button>
    </div>
  );
};

export default CampaignCategoryBar;
