const Shimmer = () => {
    return (
      <div className="animate-pulse flex flex-col p-4">
        <div className="bg-gray-300 h-48 w-full rounded-md"></div>
        <div className="mt-2 bg-gray-300 h-6 w-3/4 rounded-md"></div>
        <div className="mt-2 bg-gray-300 h-4 w-1/2 rounded-md"></div>
      </div>
    );
  };
  
  export default Shimmer;