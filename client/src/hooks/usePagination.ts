import { useState, useMemo } from "react";

export function usePagination<T>(
  data: T[],
  initialItemsPerPage: 5 | 10 | 20 = 5
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<5 | 10 | 20>(
    initialItemsPerPage
  );

  const totalPages = useMemo(() => {
    if (data.length === 0) return 1;
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const handleSetItemsPerPage = (num: number) => {
    setItemsPerPage(num as 5 | 10 | 20);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    itemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage: handleSetItemsPerPage,
  };
}
