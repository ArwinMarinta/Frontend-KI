import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useHelpCenter from "../hooks/useHelpCenter";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import CreateButton from "../../../../components/button/createButton";
import DetailDocument from "../../../../components/input/detailDocument";

const ReplyHelpCenter = () => {
  const { helpCenterDetail, handleChange, errors, form, handleSubmit } = useHelpCenter();
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <form onSubmit={handleSubmit} className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Balas Pertanyaan {helpCenterDetail?.email}</span>
            </div>
            <div className="flex flex-col gap-6">
              <Field label="Email" value={helpCenterDetail?.email || "-"} name="email" type="text" placeholder="" readOnly />
              <Field label="No Telphone" value={helpCenterDetail?.phoneNumber || "-"} name="phoneNumber" type="text" placeholder="" readOnly />
              <DetailDocument label="Dokumen" value={helpCenterDetail?.document || ""} name="phoneNumber" type="text" placeholder="" readOnly />
              <FieldTextarea label="Masalah" value={helpCenterDetail?.problem || "-"} name="problem" placeholder="" required row={2} />
              <FieldTextarea label="Dekripsi" value={helpCenterDetail?.message || "-"} name="message" placeholder="" required row={4} />
              <FieldTextarea label="Jawaban" value={form.answer} name="answer" placeholder="" row={6} onChange={handleChange} error={errors.answer} />
            </div>
            <div className="w-full flex justify-end mt-12">
              <CreateButton type="submit" label="Balas Pesan" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ReplyHelpCenter;
