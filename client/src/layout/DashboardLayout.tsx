interface Props {
  children: React.ReactNode;
}
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray to-gray-900 text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1">

        <header className="bg-yellow shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="text-sm text-gray-500">
            Welcome User 👋
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;