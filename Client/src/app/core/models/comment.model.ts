export interface Comment {
  time: Date;
  message: string;
  likes: number;
  comments: Comment[];
}
