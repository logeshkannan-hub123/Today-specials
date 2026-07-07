export interface CreateTodaySpecialInput {
  title: string;
  dishName: string;
  price: number;
  image: Buffer<ArrayBuffer>;
  video: Buffer<ArrayBuffer>;
  isActive: boolean;
}

export interface UpdateTodaySpecialInput {
  title?: string;
  dishName?: string;
  price?: number;
  image?: Buffer<ArrayBuffer>;
  video?: Buffer<ArrayBuffer>;
  isActive?: boolean;
}

export interface TodaySpecialResponse {
  id: number;
  title: string;
  dishName: string;
  price: number;
  image: string;
  video: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
