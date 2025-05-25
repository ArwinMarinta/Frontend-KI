import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import { useModal } from "../../../../hooks/useModal";
import ModalWarning from "../../../../components/modal/modalWarning";
import AddButton from "../../../../components/button/addButton";
import ModalCategoryFaq from "../components/modal/ModalCategoryFaq";
import TableWithPagination from "../../../../components/table/tableComponent";
import { FaqCategoryType } from "../../../../types/faqType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ManageButton from "../../../../components/button/manageButton";
import useCategoryFaqs from "../hooks/useCategoryFaqs";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ManageCategoryFaq = () => {
  const { faqs, limit, totalPages, currentPage, handleDeleteCategoryFaq, dispatch } = useCategoryFaqs();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | string | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddCategoryFaqs");
      setType(types);
      setMessage("Tambah Kategori FAQ");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditCategoryFaqs");
      setMessage("Ubah Kategori FAQ");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteCategoryFaqs");
      setMessage("Apakah Anda Yakin Ingin Menghapus Ketegori FAQ Ini?");
    }
  };
  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb title="FAQ" items={[{ label: "Kategori FAQ", url: "" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">FAQ</span>
                <AddButton onClick={() => handleModal(null, "Add")} />
              </div>
              <div className="  ">
                <TableWithPagination<FaqCategoryType>
                  columns={[
                    { label: "Kategori FAQ", accessor: "type" },
                    { label: "Total FAQ", accessor: "totalTypeDigunakan" },
                  ]}
                  data={faqs}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "faqsCategoryData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "faqsCategoryData", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => <ManageButton url={`/manajemen/kategori/faq/${item.type}`} />,
                    },
                    {
                      label: "Edit",
                      onClick: (item) => handleModal(item.id, "Edit"),
                      component: (item) => <UpdateButton onClick={() => handleModal(item.id, "Edit")} />,
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.type, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.type, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalCategoryFaq modal={activeModal === "AddCategoryFaqs" || activeModal === "EditCategoryFaqs"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalWarning modal={activeModal === "DeleteCategoryFaqs" || activeModal === "DeleteCategoryFaqs"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteCategoryFaq} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageCategoryFaq;
