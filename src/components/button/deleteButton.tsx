interface DeleteButtonProps {
  onClick: (id: number | null, type: string) => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(null, "Delete");
      }}
      className="py-1 px-2 border border-RED01 rounded-md text-RED01"
    >
      Hapus
    </button>
  );
};

export default DeleteButton;
