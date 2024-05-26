import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { ADMIN_DASHBOARD_PATH } from "../../../constant/paths";
import FeatherIcon from "feather-icons-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="hidden sm:flex sticky top-[72px] flex-col w-[200px] h-full bg-pp-primary-25 border-r border-pp-primary-100 py-4"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <Link to={ADMIN_DASHBOARD_PATH}>
        <div
          className={classNames(
            "flex text-sm items-center gap-3 px-4 h-[60px] border-r-4 border-purple-700",
            pathname === ADMIN_DASHBOARD_PATH ? "bg-purple-100 font-medium" : ""
          )}
        >
          <FeatherIcon icon="grid" size={16} /> Dashboard
        </div>
      </Link>
    </div>
  );
};

export default AdminSidebar;
