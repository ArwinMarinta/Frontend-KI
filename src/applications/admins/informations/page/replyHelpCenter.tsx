import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useHelpCenter from "../hooks/useHelpCenter";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import CreateButton from "../../../../components/button/createButton";

const ReplyHelpCenter = () => {
  const { helpCenterDetail, handleChange, errors, form, handleSubmit } = useHelpCenter();
  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  py-16 w-full">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Balas Pertanyaan {helpCenterDetail?.email}</span>
            </div>
            <div className="flex flex-col gap-6">
              <Field label="Email" value={helpCenterDetail?.email || "-"} name="email" type="text" placeholder="" readOnly />
              <Field label="No Telphone" value={helpCenterDetail?.phoneNumber || "-"} name="phoneNumber" type="text" placeholder="" readOnly />
              <Field label="No Telphone" value={helpCenterDetail?.document || "-"} name="phoneNumber" type="text" placeholder="" readOnly />
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
