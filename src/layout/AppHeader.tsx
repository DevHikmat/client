import { ChevronsRight, List } from "lucide-react";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";

type AppHeaderProps = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <Header style={{ padding: 0, background: "white" }}>
      <div className="flex justify-between items-center shadow">
        <Button
          type="text"
          icon={collapsed ? <ChevronsRight /> : <List />}
          onClick={toggleCollapse}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="pr-5">
          <button className="flex items-center text-gray-700 cursor-pointer">
            <span className="mr-3 overflow-hidden rounded-full h-10 w-10">
              <img
                src="https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg"
                alt="User"
              />
            </span>
            <span className="mr-1 font-medium text-sm">
              Hikmatullo Mullajonov
            </span>
          </button>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
