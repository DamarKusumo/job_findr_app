export interface DataObject {
  id: string;
  title: string;
  publicationDate: string;
  location: string;
  company: string;
  sourceSite: string;
  linkDetail: string;
  logoImgLink: string;
  position: string;
}

export interface JobResponse {
  data: DataObject[];
  currentPage: number;
  totalPages: number;
  totalData: number;
}