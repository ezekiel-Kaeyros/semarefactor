export type categorieType = {
  status: number;
  data: {
    _id: string;
    name: string;
    slug: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type prestationType = {
  status: number;
  data: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category_id: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type dateAvailableType = {
  status: number;
  data: {
    date: string;
    isOpen: boolean;
  };
};
// export type HourType = {};
