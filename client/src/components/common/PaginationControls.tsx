import { Pagination } from "@mui/material";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: 5 | 10 | 20;
  goToPage: (page: number) => void;
  setItemsPerPage: (num: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
  goToPage,
  setItemsPerPage,
}: PaginationControlsProps) {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    goToPage(value);
  };

  const primary = "#a16ee0";
  const secondary = "#7946b2";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-6 px-6">
      <div>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-2 bg-white"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: primary,
            color: "white",
            "&:hover": {
              backgroundColor: secondary,
            },
          },
        }}
      />
    </div>
  );
}
