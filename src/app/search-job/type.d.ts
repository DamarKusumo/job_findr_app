export interface DataObject {
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
  status: number;
  data: DataObject[];
  currentPage: number;
  totalPages: number;
  totalData: number;
}
