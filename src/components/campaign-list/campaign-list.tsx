/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import Campaign from "./campaign";
import { useSearchParams } from "react-router-dom";
import { CampaignInfo } from "../../data-sources/type/muzi.data-source.type";
import { getCampaignList } from "../../data-sources/muzi.data-source";


const CampaignList = () => {
    const [page, setPage] = useState(1);
    const [campaignList, setCampaignList] = useState<CampaignInfo[]>([]);
    const [campaignListLoading, setCampaignListLoading] = useState<boolean>(false);
    const [isCampaignListEnd, setIsCampaignListEnd] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const observer = useRef<IntersectionObserver | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryButtonHandler = (category:string) => {
        setSelectedCategory(category);
        setSearchParams({category});
    };

    /** 카테고리 파라미터 변경 이벤트 처리 */
    useEffect(() => {
        // URL 쿼리 파라미터로부터 category 값을 읽어옵니다.
        const queryCategory = searchParams.get('category');
        if (queryCategory) {
            setSelectedCategory(queryCategory);
        }else{
            setSelectedCategory('방문');
            setSearchParams({category:'방문'});
        }

        setCampaignList([]);
        setIsCampaignListEnd(false);
        setPage(1);

        const fetchData = async () => {
            setCampaignListLoading(true);
            const result = await getCampaignList({page: 1, size: 10, hasAvailable: true, ...(queryCategory && {category: queryCategory})});
            if (result.list.length === 0) {
                setIsCampaignListEnd(true);
            }
            setCampaignList(result.list);
            setCampaignListLoading(false);
        };
    
        fetchData();
    }, [searchParams]);
    
    /** 페이지 변경 이벤트처리 */
    useEffect(() => {
        // URL 쿼리 파라미터로부터 category 값을 읽어옵니다.
        const queryCategory = searchParams.get('category');
        const fetchData = async () => {
            setCampaignListLoading(true);
            const result = await getCampaignList({page, size:10, hasAvailable:true, ...(queryCategory && {category: queryCategory})});
            if(result.list.length === 0){
                setIsCampaignListEnd(true);
            }
            setCampaignList((campaignList)=>[...campaignList, ...result.list]);
            setCampaignListLoading(false);
        };

        if (page === 1) return;
        fetchData();
      }, [page]);

      /** 무한 스크롤 이벤트 처리 */
      const lastElementRef = useCallback((node:HTMLDivElement|null) => {
        if (campaignListLoading) return; // 로딩 중이면 observer를 연결하지 않음
        if (observer.current) observer.current.disconnect(); // 기존 observer 연결 해제
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && !isCampaignListEnd) {
            // 교차하면 페이지 번호 증가시키고 추가 데이터 로드
            setPage(prevPageNumber => prevPageNumber + 1);
          }
        });
        if (node) observer.current.observe(node); // 새 노드에 observer 연결
      }, [campaignListLoading]);

    
    return (
        <div className="flex flex-col w-full items-center">
                <div className="w-full max-w-7xl p-10 ">
                    <button
                        onClick={() => categoryButtonHandler('방문')}
                        disabled={selectedCategory === '방문'}
                        className={`text-xl mr-4 underline-offset-8 ${selectedCategory === '방문' && 'text-sky-400 underline decoration-sky-400'}`}
                    >
                        방문형
                    </button>
                    <button
                        onClick={() => categoryButtonHandler('배송')}
                        disabled={selectedCategory === '배송'}
                        className={`text-xl mr-4 underline-offset-8 ${selectedCategory === '배송' && 'text-sky-400 underline decoration-sky-400'}`}
                    >
                        배송형
                    </button>
                    <button
                        onClick={() => categoryButtonHandler('기자단')}
                        disabled={selectedCategory === '기자단'}
                        className={`text-xl mr-4 underline-offset-8 ${selectedCategory === '기자단' && 'text-sky-400 underline decoration-sky-400'}`}
                    >
                        기자단
                    </button>
                    <button
                        onClick={() => categoryButtonHandler('기타')}
                        disabled={selectedCategory === '기타'}
                        className={`text-xl mr-4 underline-offset-8 ${selectedCategory === '기타' && 'text-sky-400 underline decoration-sky-400'}`}
                    >
                        기타
                    </button>
            </div>
            <div className="w-full max-w-7xl px-10">
                <div className="grid grid-cols-2 gap-[15px] gap-y-[50px] lg:grid-cols-3 xl:grid-cols-5">
                    {campaignList.map((campaign)=>Campaign(campaign))}
                </div>
            </div>
            <div ref={lastElementRef}></div>
        </div>
    );
}
export default CampaignList;