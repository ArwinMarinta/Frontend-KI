interface ModalLoadingProps {
  show: boolean;
}

const ModalLoading = ({ show }: ModalLoadingProps) => {
  if (!show) return null;

  return (
    // Background overlay transparan hitam semi
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Container modal */}
      <div className="bg-transparent p-6 rounded-md flex flex-col items-center gap-6">
        {/* Spinner sederhana */}
        <svg className="animate-spin h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-white text-lg font-medium">Mengirim Data...</p>
      </div>
    </div>
  );
};

export default ModalLoading;
