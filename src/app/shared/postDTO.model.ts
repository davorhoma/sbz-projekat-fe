export interface PostDTO {
  id: string;
  text: string;
  hashtags: string[];
  numberOfLikes: number;
  numberOfReports: number;
  userFirstName: string;
  userLastName: string;
}