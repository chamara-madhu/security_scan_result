import classNames from "classnames";
import { STATUS } from "../../../constant/general";

const StatusIndicators = ({ status }) => {
  const getStatus = () => {
    switch (status) {
      case STATUS.QUEUED:
        return "bg-gray-200 text-gray-900";
      case STATUS.IN_PROGRESS:
        return "bg-orange-100 text-orange-900";
      case STATUS.SUCCESS:
        return "bg-green-100 text-green-900";
      default:
        return "bg-red-200 text-pink-900";
    }
  };

  return (
    <span
      className={classNames(
        "flex items-center w-fit bg-gray-300 text-xs font-medium h-6 px-4 rounded-full",
        getStatus()
      )}
    >
      {status}
    </span>
  );
};

export default StatusIndicators;
