export interface DocumentCategoryType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  totalTypeDigunakan: string;
}

export interface DocumentType {
  id: number;
  type: string;
  title: string;
  document: string | null;
  cover: string | null;
  createdAt: string;
  updatedAt: string;
}
