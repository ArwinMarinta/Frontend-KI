export interface IndustialDesignType {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type FormIndustialDesign = {
  title: string;
};

export interface IndustialDesignSubType {
  id: number;
  title: string;
  typeDesignId: number;
  createdAt: string;
  updatedAt: string;
}
