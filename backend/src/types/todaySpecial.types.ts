export interface CreateTodaySpecialInput {
  title: string;
  dishName: string;
  price: number;
  image: Buffer<ArrayBuffer> | null;
  video: Buffer<ArrayBuffer> | null;
  isActive: boolean;
}

export interface UpdateTodaySpecialInput {
  title?: string;
  dishName?: string;
  price?: number;
  image?: Buffer<ArrayBuffer> | null;
  video?: Buffer<ArrayBuffer> | null;
  isActive?: boolean;
}

export interface TodaySpecialResponse {
  id: number;
  title: string;
  dishName: string;
  price: number;
  image: string | null;
  video: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
