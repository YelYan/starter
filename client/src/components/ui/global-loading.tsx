const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-40 z-50">
      <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
