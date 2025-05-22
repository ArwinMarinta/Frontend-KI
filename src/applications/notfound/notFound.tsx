const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-NEUTRAL05">
      <div className="flex flex-row justify-center items-center gap-10">
        <p className="text-9xl font-Poppins text text-red-700">404</p>
        <div className="flex flex-col text-4xl font- font-semibold text-white">
          <p>NOT</p>
          <p>FOUND</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
