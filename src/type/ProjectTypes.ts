export type ProjectKey = string;
export type HashTagType = string[];
export type skillType = string[];
export type startDate = Date | null;
export type endDate = Date | null;

export interface projectRoles {
  role: number;
  roleName: string;
  rolePercent: number;
  role_id?: number;
}
export interface ProjectDetailProps {
  id: string;
  title: string;
  skill: string[];
  company: string;
  hashtag: HashTagType;
  projectUrl: string;
  startDate: startDate;
  endDate: endDate;
  thumbnail: string;
  description: string;
  projectDescription: string;
  projectRoles: projectRoles[];
}

export interface ProjectPostProps extends ProjectDetailProps {}

export interface UploadThumbnailResponseProps {
  message: string;
  imgUrl: string;
}
