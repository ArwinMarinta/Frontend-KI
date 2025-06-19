interface ModalLoadingProps {
  show: boolean;
}

const ModalLoading = ({ show }: ModalLoadingProps) => {
  if (!show) return null;

  return (
    // Background overlay transparan hitam semi
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50">
      {/* Container modal */}
      <div className="bg-transparent p-6 rounded-md flex flex-col items-center gap-6">
        {/* Spinner sederhana */}
        <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="white">
          <circle cx="15" cy="15" r="15">
            <animate attributeName="opacity" begin="0s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="15" r="15">
            <animate attributeName="opacity" begin="0.2s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="15" r="15">
            <animate attributeName="opacity" begin="0.4s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
          </circle>
        </svg>
        <p className="text-white text-lg font-medium">Menunggu</p>
      </div>
    </div>
  );
};

export default ModalLoading;
