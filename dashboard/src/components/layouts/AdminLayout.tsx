import { ReactNode } from "react";
import Navbar from "../shared/headers/Navbar";
import AdminSidebar from "./admin-side-bar/AdminSideBar";
import { useMediaQuery } from "react-responsive";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <AdminSidebar />
        <div
          className="relative flex flex-col w-full p-5 sm:p-7 xl:p-10"
          style={{ width: isMobile ? "100%" : "calc(100% - 200px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
