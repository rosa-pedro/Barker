export interface Post {
  title: string;
  smallMessage: string;
  likes: number;
  nComments: number;
}
export interface FullPost{
  title: string;
  message: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  time: Date;
  message: string;
  likes: number;
  comments: Comment[];
}
