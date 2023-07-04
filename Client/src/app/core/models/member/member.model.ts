export interface Member {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  city: string;
  about: string;
  photo?: string;
  age: number;
  created: Date;
  lastActive: Date;
  numberOfPosts: number;
  numberOfPets: number;
}
