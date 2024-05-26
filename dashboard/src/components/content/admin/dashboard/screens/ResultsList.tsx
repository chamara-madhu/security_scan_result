import { memo, useMemo } from "react";
import { Meta, Result } from "../../../../../api/dashboardAPI";
import Badge from "../../../../shared/status-indicators/Badge";
import moment from "moment";
import StatusIndicators from "../../../../shared/status-indicators/StatusIndicators";
import PreLoading from "../../../../shared/loading/PreLoading";
import CommonTable from "../../../../shared/table/CommonTable";

interface ResultsListProps {
  results: {
    data: Result[];
    meta: Meta;
  } | null;
  selectedId: string;
  onSelect: (id: string) => void;
  preLoading: boolean;
  loadResults: any;
}

interface Data {
  repositoryName: string;
  status: string;
  count: number;
  timestamp: string;
}

const ResultsList = ({
  results,
  selectedId,
  onSelect,
  preLoading,
  loadResults,
}: ResultsListProps) => {
  const data: Data[] | null = results?.data?.length
    ? results.data.map((result) => ({
        id: result.id,
        repositoryName: result.repositoryName,
        status: result.status,
        count: result?.findings?.length || 0,
        timestamp:
          result.status === "Queued"
            ? moment.utc(result.queuedAt).local().format("YYYY-MM-DD HH:mm A")
            : result.status === "In Progress"
            ? moment
                .utc(result.scanningAt!)
                .local()
                .format("YYYY-MM-DD HH:mm A")
            : moment
                .utc(result.finishedAt!)
                .local()
                .format("YYYY-MM-DD HH:mm A"),
      }))
    : null;

  const columns = useMemo(
    () => [
      { header: "Repository Name", accessor: "repositoryName" },
      {
        header: "Status",
        accessor: "status",
        render: (item: Data) => <StatusIndicators status={item.status} />,
      },
      {
        header: "Findings",
        accessor: "count",
        render: (item: Data) =>
          item?.count ? <Badge count={item.count} /> : null,
      },
      { header: "Timestamp", accessor: "timestamp" },
    ],
    []
  );

  return (
    <div className="w-full p-6 overflow-x-auto bg-white border border-purple-200 rounded-xl">
      <h1 className="mb-4 text-xl font-bold">Security Scan Results</h1>
      {preLoading ? (
        <PreLoading />
      ) : (
        <CommonTable
          columns={columns}
          data={data}
          meta={results?.meta}
          selectedId={selectedId}
          onSelect={onSelect}
          loadResults={loadResults}
        />
      )}
    </div>
  );
};

export default memo(ResultsList);
