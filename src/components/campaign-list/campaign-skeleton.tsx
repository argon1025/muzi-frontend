const CampaignSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-fixed w-full h-60 overflow-hidden rounded-lg mb-5">
        <div className="w-full h-full object-cover bg-center animate-pulse bg-gray-200 " />
      </div>
      <div className="flex flex-col">
        <div className="w-[20%] h-4 rounded-lg animate-pulse bg-gray-200 "></div>
        <div className="w-[80%] h-4 mt-2 rounded-lg animate-pulse bg-gray-200 "></div>
        <div className="w-[90%] h-4 mt-2 rounded-lg animate-pulse bg-gray-200 "></div>
        <div className="w-[65%] h-4 mt-2 rounded-lg animate-pulse bg-gray-200 "></div>
      </div>
    </div>
  );
};

export default CampaignSkeleton;
