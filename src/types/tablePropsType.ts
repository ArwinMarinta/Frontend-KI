export type TablePropsType = {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
  totalTerms: number;
  onPageChange: (page: number) => void;
};
