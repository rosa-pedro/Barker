export interface Post {
  id: number;
  title: string;
  content: string;
  created: Date;
  votes: number;
  author: string;
  photo: string;
  comments: number;
}
