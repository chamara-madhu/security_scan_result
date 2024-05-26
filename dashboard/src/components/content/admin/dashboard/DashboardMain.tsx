import { useEffect, useState, useCallback } from "react";
import ResultsForm from "./screens/ResultsForm";
import ResultsList from "./screens/ResultsList";
import FindingsList from "./screens/FindingsList";
import { Response, fetchAllResults } from "../../../../api/dashboardAPI";
import { scrollToTop } from "../../../../utils/general";

const DashboardMain = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [results, setResults] = useState<Response | null>(null);
  const [preLoading, setPreLoading] = useState<boolean>(true);

  const fetchResults = useCallback(async (page = 1) => {
    try {
      const response = await fetchAllResults(page);
      setResults(response?.data || null);
      scrollToTop();
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setPreLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 xl:gap-8 lg:flex-row">
      <ResultsForm loadResults={fetchResults} />
      <div className="flex flex-col w-full lg:w-[65%] gap-5 sm:gap-8">
        <ResultsList
          results={results}
          onSelect={handleSelect}
          selectedId={selectedId}
          preLoading={preLoading}
          loadResults={fetchResults}
        />
        {selectedId && <FindingsList id={selectedId} />}
      </div>
    </div>
  );
};

export default DashboardMain;
