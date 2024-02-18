import { useState } from "react";
import search_icon from "../../resources/search.png";
import { useSearchParams } from "react-router-dom";

const CampaignTitleBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const KeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("title", inputValue);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div className="ml-auto relative">
      <img
        src={search_icon}
        className="w-[20px] h-[20px] absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        alt="search_icon"
      />
      <input
        type="email"
        className="mt-1 pl-10 pr-1 py-[10px] bg-gray-100 caret-sky-500 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg focus:ring-1"
        placeholder="검색어를 입력해주세요."
        onChange={onChangeHandler}
        onKeyDown={KeyDownHandler}
        defaultValue={searchParams.get("title") || ""}
      />
    </div>
  );
};

export default CampaignTitleBar;
