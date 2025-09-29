import { Button, Card } from "antd";
import { Database, UserPlus } from "lucide-react";
import React from "react";

interface ContentHeaderProps {
  handleAdd: () => void;
  buttonText: string;
  title: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ title, handleAdd, buttonText }) => {
  return (
    <div className="shadow-sm border-0 rounded-xl bg-white/80 backdrop-blur-sm !mb-4 p-3">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
              <Database className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        </div>
        <Button
          icon={<UserPlus className="w-4 h-4" />}
          onClick={handleAdd}
          size="large"
          className="!bg-gradient-to-r from-purple-500 to-indigo-600 !text-white border-0 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
