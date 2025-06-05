interface AddButtonProps {
  onClick?: () => void;
  loading: boolean;
  type: string;
}

const AddButtonModal = ({ onClick, loading, type }: AddButtonProps) => {
  return (
    <button disabled={loading} onClick={onClick} className="flex flex-row items-center px-4 py-2 text-white bg-PRIMARY01  rounded-md font-medium">
      {type === "Add" ? "Tambah" : "Ubah"}
    </button>
  );
};

export default AddButtonModal;
