import React from "react";

interface BadgeProps {
  count: number;
}

const Badge: React.FC<BadgeProps> = ({ count }) => {
  return (
    <span className="px-4 py-1 text-sm text-white bg-purple-400 rounded">
      {count}
    </span>
  );
};

export default Badge;
