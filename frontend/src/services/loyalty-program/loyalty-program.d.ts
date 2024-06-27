export type CreateLoytyProgramProps = {
  createLoyaltyProgramTranslation: {
    name: string;
    description?: string;
    price?: number;
    image_url?: string;
    points: number;
  };
};

export type ReturnLoyaltyPropsType = {
  data: {
    name: string;
    products: Array<{
      name: string;
      points: number;
      description?: string;
      image_url?: any;
    }>;
  };
  status: number;
};
