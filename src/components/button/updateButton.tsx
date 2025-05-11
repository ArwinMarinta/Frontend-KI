interface UpdateButtonProps {
  onClick: (id: number | null, type: string) => void;
}

const UpdateButton = ({ onClick }: UpdateButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(null, "Edit");
      }}
      className="py-1 px-2 border border-YELLOW03 rounded-md text-YELLOW03 "
    >
      Ubah
    </button>
  );
};

export default UpdateButton;
