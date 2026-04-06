import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 gap-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-orange-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() =>
          onPageChange(Math.min(currentPage + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-orange-300 hover:text-white active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;