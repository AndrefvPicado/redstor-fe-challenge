import { IPhoto } from './photo.interface';

export interface ICollection {
  id: number;
  title: string;
  published_at: Date;
  cover_photo: IPhoto;
  total_photos: number;
}
