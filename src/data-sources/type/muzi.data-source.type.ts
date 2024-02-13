export interface GetCampaignListOptions {
  page: number;
  size: number;
  title?: string;
  address?: string;
  category?: string;
  hasAvailable?: boolean;
}

export interface GetCampaignListResponse {
  list: CampaignInfo[];
  total: number;
}

export interface CampaignInfo {
  id: string;
  resourceProvider: string;
  originUrl: string;
  title: String;
  category?: string;
  targetPlatforms?: string;
  thumbnail?: string;
  address?: string;
  recruitCount?: number;
  applyCount?: number;
  startedAt?: string;
  endedAt?: string;
  drawAt?: string;
  updatedAt: string;
  createdAt: string;
}
