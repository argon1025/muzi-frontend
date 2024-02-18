/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import Campaign from "./campaign";
import { useSearchParams } from "react-router-dom";
import { CampaignInfo } from "../../data-sources/type/muzi.data-source.type";
import { getCampaignList } from "../../data-sources/muzi.data-source";
import CampaignCategoryBar from "./campaign-category-bar";
import CampaignProviderBar from "./campaign-provider-bar";
import CampaignAddressBar from "./campaign-address-bar";
import CampaignTitleBar from "./campaign-title-bar";
import CampaignSkeleton from "./campaign-skeleton";

const CampaignList = () => {
  // URL 쿼리 파라미터 상태
  const [searchParams] = useSearchParams();

  // 캠페인 목록 상태
  const [page, setPage] = useState(1); // 페이지 번호
  const [campaignList, setCampaignList] = useState<CampaignInfo[]>([]); // 캠페인 목록
  const [isLoading, setIsLoading] = useState<boolean>(false); // 캠페인 목록 첫 로딩 상태
  const [isContinueLoading, setIsContinueLoading] = useState<boolean>(false); // 캠페인 목록 추가 로딩 상태
  const [isCampaignListEnd, setIsCampaignListEnd] = useState<boolean>(false); // 캠페인 목록의 끝 여부
  const observer = useRef<IntersectionObserver | null>(null); // 무한 스크롤을 위한 observer

  /** 첫 컴포넌트 로드 처리 */
  useEffect(() => {
    const queryCategory = searchParams.get("category");
    const queryProvider = searchParams.get("provider");
    const queryAddress = searchParams.get("address");
    const queryTitle = searchParams.get("title");

    setCampaignList([]);
    setIsCampaignListEnd(false);
    setPage(1);

    const fetchData = async () => {
      setIsLoading(true);
      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      await wait(500);
      const result = await getCampaignList({
        page: 1,
        size: 16,
        hasAvailable: true,
        ...(queryCategory && { category: queryCategory }),
        ...(queryProvider && queryProvider !== "all" && { provider: queryProvider }),
        ...(queryAddress && queryAddress !== "전체" && { address: queryAddress }),
        ...(queryTitle && { title: queryTitle }),
      });
      if (result.list.length === 0) {
        setIsCampaignListEnd(true);
      }
      setCampaignList(result.list);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  /** 페이지 변경 이벤트처리 */
  useEffect(() => {
    const queryCategory = searchParams.get("category");
    const queryProvider = searchParams.get("provider");
    const queryAddress = searchParams.get("address");
    const queryTitle = searchParams.get("title");

    const fetchData = async () => {
      setIsContinueLoading(true);
      const result = await getCampaignList({
        page,
        size: 16,
        hasAvailable: true,
        ...(queryCategory && { category: queryCategory }),
        ...(queryProvider && queryProvider !== "all" && { provider: queryProvider }),
        ...(queryAddress && queryAddress !== "전체" && { address: queryAddress }),
        ...(queryTitle && { title: queryTitle }),
      });
      if (result.list.length === 0) {
        setIsCampaignListEnd(true);
      }
      setCampaignList((campaignList) => [...campaignList, ...result.list]);
      setIsContinueLoading(false);
    };

    if (page === 1) return;
    fetchData();
  }, [page]);

  /** 무한 스크롤 이벤트 처리 */
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isContinueLoading || isLoading) return; // 로딩 중이면 observer를 연결하지 않음
      if (observer.current) observer.current.disconnect(); // 기존 observer 연결 해제
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isCampaignListEnd) {
          // 교차하면 페이지 번호 증가시키고 추가 데이터 로드
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node); // 새 노드에 observer 연결
    },
    [isContinueLoading, isLoading]
  );

  return (
    <div className="flex flex-col w-full items-center p-[10px]">
      <CampaignProviderBar />
      <div className="flex flex-col w-full max-w-5xl bg-sky-50 rounded-lg border border-sky-100 p-5 mt-3">
        <span className="text-sky-400">체험단 유형</span>
        <CampaignCategoryBar />
        <span className="text-sky-400 mt-4">지역</span>
        <CampaignAddressBar />
        <span className="text-sky-400 mt-4">타이틀</span>
        <CampaignTitleBar />
      </div>
      <div className="w-full max-w-5xl pt-[20px]">
        <div className="grid grid-cols-2 gap-[15px] gap-y-[50px] lg:grid-cols-4">
          {isLoading ? (
            <>
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
              <CampaignSkeleton />
            </>
          ) : (
            campaignList.map((campaign) => Campaign(campaign))
          )}
        </div>
      </div>
      <div ref={lastElementRef}></div>
    </div>
  );
};
export default CampaignList;
