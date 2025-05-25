import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import AddButton from "../../../../components/button/addButton";
import DeleteButton from "../../../../components/button/deleteButton";
import UpdateButton from "../../../../components/button/updateButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import TableWithPagination from "../../../../components/table/tableComponent";
import { useModal } from "../../../../hooks/useModal";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import { FaqType } from "../../../../types/faqType";
import ModalFaq from "../components/modal/ModalFaq";
import useFaq from "../hooks/useFaq";

const ManageFaq = () => {
  const { faqs, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useFaq();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddFaqs");
      setType(types);
      setMessage("Tambah  FAQ");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditFaqs");
      setMessage("Ubah FAQ");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteFaqs");
      setMessage("Apakah Anda Yakin Ingin Menghapus FAQ Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className="mb-8">
            <Breadcrumb
              title="FAQ"
              items={[
                { label: "Kategori FAQ", url: "/manajemen/kategori/faq" },
                { label: "FAQ", url: "" },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">FAQ</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<FaqType>
                columns={[
                  { label: "Pertanyaan", accessor: "question" },
                  { label: "Jawaban", accessor: "answer" },
                ]}
                data={faqs}
                limit={limit}
                totalPages={totalPages}
                currentPage={currentPage}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "faqsData", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "faqsData", currentPage: page }))}
                actions={[
                  {
                    label: "Edit",
                    onClick: (item) => handleModal(item.id, "Edit"),
                    component: (item) => <UpdateButton onClick={() => handleModal(item.id, "Edit")} />,
                  },
                  {
                    label: "Delete",
                    onClick: (item) => handleModal(item.id, "Delete"),
                    component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                  },
                ]}
              />
            </div>
            <ModalFaq modal={activeModal === "AddFaqs" || activeModal === "EditFaqs"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteFaqs" || activeModal === "DeleteFaqs"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageFaq;
