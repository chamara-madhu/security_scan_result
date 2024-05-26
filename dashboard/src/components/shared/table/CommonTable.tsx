import { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../buttons/Button";
import { Meta } from "../../../api/dashboardAPI";

interface Column {
  header: string;
  accessor: keyof any;
  render?: any;
}

interface TableProps {
  columns: Column[];
  data: any[] | null;
  meta?: Meta;
  onSelect?: (id: string) => void;
  selectedId?: string;
  loadResults?: (currentPage: number) => void;
}

const CommonTable = ({
  columns,
  data,
  meta,
  onSelect,
  selectedId,
  loadResults,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loadResults) return;
    loadResults(currentPage);
  }, [currentPage, loadResults]);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.length ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onSelect && onSelect(row.id)}
                className={classNames(
                  "cursor-pointer hover:bg-purple-100",
                  selectedId === row?.id && selectedId !== undefined
                    ? "bg-purple-100"
                    : ""
                )}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-sm" colSpan={4}>
                No records
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {meta && (
        <div className="sticky bottom-0 flex items-center justify-between w-full px-6 pt-3 pb-4 bg-white border-t border-pp-gray-200 rounded-bl-2xl rounded-br-2xl">
          <span className="text-sm font-medium text-pp-gray-700">
            Page {meta?.currentPage || "1"} of {meta?.totalPages || "1"}
          </span>
          {meta?.totalPages > 1 && (
            <div className="flex gap-3">
              <Button
                handleButton={() => setCurrentPage((prev) => prev - 1)}
                isDisabled={currentPage === 1}
                variant="light"
              >
                Previous
              </Button>
              <Button
                handleButton={() => setCurrentPage((prev) => prev + 1)}
                isDisabled={currentPage === (meta?.totalPages || 1)}
                variant="light"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CommonTable;
