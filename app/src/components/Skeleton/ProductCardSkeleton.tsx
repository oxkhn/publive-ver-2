import React from "react";
import Skeleton from ".";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="relative w-full min-w-[160px] cursor-pointer transition-all max-md:min-w-[163px]">
      <div>
        <div className="mr-1 mt-3 rounded-lg border border-transparent bg-white shadow-card hover:border-primary">
          <Skeleton className="aspect-square h-[190px] w-full rounded-lg" />

          <div className="flex flex-col p-3">
            <Skeleton className="h-6 w-3/4" />

            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
