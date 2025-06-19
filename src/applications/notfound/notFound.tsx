import NotFoundImage from "../../assets/images/404 Error-cuate.svg";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-NEUTRAL05">
      <img src={NotFoundImage} alt="Not Found" className="md:h-[400px]  xl:h-[600px]" loading="lazy" />
    </div>
  );
};

export default NotFound;
