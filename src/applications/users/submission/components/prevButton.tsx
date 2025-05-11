import React from "react";

type PrevButtonProps = {
  onClick: () => void;
};

const prevButton = ({ onClick }: PrevButtonProps) => {
  return (
    <button onClick={onClick} className="bg-GREY01 px-4 py-2 text-GREY02 font-medium rounded-md">
      Kembali
    </button>
  );
};

export default prevButton;
