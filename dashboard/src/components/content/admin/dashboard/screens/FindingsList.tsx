import { memo, useEffect, useState, useMemo } from "react";
import { Finding, fetchResult } from "../../../../../api/dashboardAPI";
import PreLoading from "../../../../shared/loading/PreLoading";
import CommonTable from "../../../../shared/table/CommonTable";

interface FindingsListProps {
  id: string;
}

interface Data {
  ruleId: string;
  description: string;
  severity: string;
  path: string;
}

const FindingsList = ({ id }: FindingsListProps) => {
  const [findings, setFindings] = useState<Data[]>([]);
  const [preLoading, setPreLoading] = useState(true);

  useEffect(() => {
    const fetchFindings = async (id: string) => {
      try {
        const response = await fetchResult(id || null);

        if (response?.data?.findings?.length) {
          const data: Data[] = response?.data?.findings.map(
            (finding: Finding) => ({
              ruleId: finding.ruleId,
              description: finding?.metadata?.description,
              severity: finding?.metadata?.severity,
              path: `${finding?.location?.path} : ${finding?.location?.positions?.begin?.line}`,
            })
          );
          setFindings(data);
        } else {
          setFindings([]);
        }
      } catch (err) {
        console.log({ err });
      } finally {
        setPreLoading(false);
      }
    };

    fetchFindings(id);
  }, [id]);

  const columns = useMemo(
    () => [
      { header: "RuleId", accessor: "ruleId" },
      { header: "Description", accessor: "description" },
      { header: "Severity", accessor: "severity" },
      { header: "Path : Line Number", accessor: "path" },
    ],
    []
  );

  return (
    <div className="p-6 overflow-x-auto bg-white border border-purple-200 rounded-lg">
      <h1 className="mb-4 text-xl font-bold">
        Findings for Scan: <span className="text-sm font-medium">{id}</span>
      </h1>
      {preLoading ? (
        <PreLoading />
      ) : (
        <CommonTable columns={columns} data={findings} />
      )}
    </div>
  );
};

export default memo(FindingsList);
