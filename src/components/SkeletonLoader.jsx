import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
      <div className="skeleton h-48 w-full"></div>
      <div className="p-4">
        <div className="skeleton h-4 w-3/4 mb-2 rounded"></div>
        <div className="skeleton h-3 w-1/2 mb-3 rounded"></div>
        <div className="skeleton h-4 w-1/4 mb-3 rounded"></div>
        <div className="skeleton h-8 w-full rounded"></div>
      </div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className="space-y-2">
      <div className="skeleton h-4 w-full rounded"></div>
      <div className="skeleton h-4 w-5/6 rounded"></div>
      <div className="skeleton h-4 w-4/6 rounded"></div>
    </div>
  );

  const renderButtonSkeleton = () => (
    <div className="skeleton h-10 w-32 rounded"></div>
  );

  const skeletons = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'card':
        skeletons.push(<div key={i} className="animate-fade-in-up">{renderCardSkeleton()}</div>);
        break;
      case 'text':
        skeletons.push(<div key={i} className="animate-fade-in-up">{renderTextSkeleton()}</div>);
        break;
      case 'button':
        skeletons.push(<div key={i} className="animate-fade-in-up">{renderButtonSkeleton()}</div>);
        break;
      default:
        skeletons.push(<div key={i} className="animate-fade-in-up">{renderCardSkeleton()}</div>);
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {skeletons}
    </div>
  );
};

export default SkeletonLoader;
