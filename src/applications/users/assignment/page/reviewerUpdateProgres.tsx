import useUpdateProgress from "../../../../hooks/useUpdateProgress";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import { statusReviewerList } from "../../../../data/submissionStatus";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { FiUploadCloud } from "react-icons/fi";
import { BsFillFilePdfFill } from "react-icons/bs";
import { AiFillFileWord } from "react-icons/ai";
import { HiOutlineDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Field from "../../../../components/input/fieldInput";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import ModalLoading from "../../../../components/modal/modalLoading";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import ModalWarningProgress from "../../../../components/modal/modalWarningProgress";

const ReviewerUpdateProgres = () => {
  const { formUpdateProgress, handleSaveClickReviewer, formErrors, handleChange, handleFileChange, handleRemoveFile, loading, handleUpdateProgress, setPendingType, handleCloseModal, activeModal, message } = useUpdateProgress();

  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb
                title="PENUGASAN"
                items={[
                  { label: "Penugasan", url: "/penugasan" },
                  {
                    label: "Progres",
                    url: "/penugasan/progress",
                  },
                  { label: "Ubah", url: "" },
                ]}
              />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex items-center h-24 mb-10">
                <h1 className="text-center text-3xl w-full font-bold">Ubah Progress Pengajuan</h1>
              </div>
              <div className="flex flex-col gap-6">
                <FieldDropdown
                  label="Status Pengajuan"
                  name="reviewStatus"
                  type="select"
                  value={formUpdateProgress.reviewStatus}
                  onChange={handleChange}
                  options={
                    statusReviewerList?.map((item) => ({
                      label: item.label,
                      value: item.key,
                    })) ?? []
                  }
                  error={formErrors.reviewStatus}
                  need
                />
                {formUpdateProgress.reviewStatus === "Pembayaran" && <Field label="Kode Pembayaran" value={formUpdateProgress.paymentCode} name="paymentCode" type="text" placeholder="" need error={formUpdateProgress.paymentCode} onChange={handleChange} />}

                <FieldTextarea label="Komentar" value={formUpdateProgress.comments} name="comments" placeholder="" required row={4} onChange={handleChange} />
                <div>
                  <label className="block mb-2 text-base font-medium">File</label>
                  <div className={`w-full relative rounded-md border border-dashed ${formErrors.files ? "border-RED01" : "border-BORDER01"}`}>
                    <input type="file" id="fileUpload" name="fileUpload" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
                    <button type="button" className="w-full bg-gray-100 gap-2  flex flex-col items-center  text-gray-500 py-6 px-4 rounded-md ">
                      <FiUploadCloud className="text-[50px]" />
                      <span className="text-lg font-semibold">Pilih dokumen atau seret dan lepas di sini</span>
                      <span className="text-sm">PDF atau Word, ukuran file tidak lebih dari 5MB</span>
                    </button>
                  </div>
                  {formErrors.files && <p className="text-sm text-RED01 mt-1">{formErrors.files}</p>}

                  <div className="flex flex-col">
                    {formUpdateProgress.files.length > 0 && (
                      <ul className="mt-2 space-y-1 text-sm text-gray-700 ">
                        {formUpdateProgress.files.map((file, index) => {
                          const ext = file.name.split(".").pop()?.toLowerCase();
                          const Icon = ext === "pdf" ? BsFillFilePdfFill : ext === "doc" || ext === "docx" ? AiFillFileWord : HiOutlineDocument;
                          const iconColor = ext === "pdf" ? "text-red-600" : ext === "doc" || ext === "docx" ? "text-blue-600" : "text-gray-400";

                          return (
                            <li key={index} className="flex items-center justify-between gap-2 border py-2 px-2 rounded-md border-BORDER01">
                              <div className="flex flex-row gap-2">
                                <Icon className={`text-xl ${iconColor}`} />
                                <span className="truncate">{file.name}</span>
                                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                              </div>
                              <button onClick={() => handleRemoveFile(index)}>
                                <FaTrash className="text-RED01" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button onClick={handleSaveClickReviewer} className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ModalLoading show={loading} />
          <ModalWarningProgress
            modal={activeModal === "warningUpdateProgressReviewer"}
            setModal={handleCloseModal}
            message={message}
            handleNext={() => {
              handleCloseModal();
              handleUpdateProgress();
              setPendingType(undefined);
            }}
            handleClose={handleCloseModal}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewerUpdateProgres;
