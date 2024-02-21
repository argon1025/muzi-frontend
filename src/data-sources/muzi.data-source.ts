import axios from "axios";
import { GetCampaignListOptions, GetCampaignListResponse } from "./type/muzi.data-source.type";

const getCampaignList = async (options: GetCampaignListOptions): Promise<GetCampaignListResponse> => {
  const { page, size, title, address, category, hasAvailable, resourceProvider } = options;
  try {
    const result = await axios.request<GetCampaignListResponse>({
      url: `https://backend.mu-zi.net/campaign`,
      method: "GET",
      params: {
        page,
        size,
        title,
        address,
        category,
        hasAvailable,
        resourceProvider,
      },
    });
    return result.data;
  } catch (error) {
    return { list: [], total: 0 };
  }
};

export { getCampaignList };
