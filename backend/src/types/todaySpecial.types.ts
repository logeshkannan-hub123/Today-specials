export interface CreateTodaySpecialInput {
  title: string;
  dishName: string;
  price: number;
  image: Buffer | null;
  video: Buffer | null;
  isActive: boolean;
}

export interface UpdateTodaySpecialInput {
  title?: string;
  dishName?: string;
  price?: number;
  image?: Buffer | null;
  video?: Buffer | null;
  isActive?: boolean;
}

export interface TodaySpecialResponse {
  id: string;
  title: string;
  dishName: string;
  price: number;
  image: string | null;
  video: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
