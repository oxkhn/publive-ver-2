import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={clsx("animate-pulse rounded bg-gray-300/40", className)} />
  );
};

export default Skeleton;
