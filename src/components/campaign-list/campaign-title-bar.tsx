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

  const deleteButtonHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("title");
    setSearchParams(newSearchParams);
    setInputValue("");
  };

  return (
    <div className="relative mt-3 items-center z-0">
      <img
        src={search_icon}
        className="w-[20px] h-[20px] absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        alt="search_icon"
      />
      <input
        type="email"
        className="mt-1 pl-10 pr-1 py-[10px] border border-gray-200  caret-sky-500 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg focus:ring-1"
        placeholder="검색어를 입력해주세요."
        onChange={onChangeHandler}
        onKeyDown={KeyDownHandler}
        defaultValue={searchParams.get("title") || ""}
        value={inputValue}
      />
      <button
        className="absolute right-3 top-[27px] transform -translate-y-1/2 text-gray-500"
        onClick={deleteButtonHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CampaignTitleBar;
