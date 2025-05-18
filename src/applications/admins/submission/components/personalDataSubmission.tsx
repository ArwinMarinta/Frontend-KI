import DetailDocument from "../../../../components/input/detailDocument";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { PersonalData } from "../../../../types/submissionType";

interface GeneralType {
  data: PersonalData[] | null | undefined;
}

const PersonalDataSubmission = ({ data }: GeneralType) => {
  return (
    <div className="flex flex-col gap-8">
      {data?.map((item, index) => (
        <div key={item.id} className="border p-6 rounded-md flex flex-col gap-6 border-PRIMARY01">
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label={`${item.isLeader ? "Ketua Pencipta" : `Kontributor ${index + 0}`}`} value={item.name || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Email" value={item.name || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Instansi" value={item.institution || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Pekerjaan" value={item.work || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Negara Kebangsaan" value={item.nationalState || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Negara Tempat Tingggal" value={item.countryResidence || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Provinsi" value={item.province || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Kota/Kabupaten" value={item.city || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Kecamatan" value={item.subdistrict || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Kelurahan" value={item.ward || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Kode Pos" value={item.postalCode || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Nomor Handphone" value={item.phoneNumber || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Facebook" value={item.facebook || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Whatsapp" value={item?.whatsapp || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <Field label="Instagram" value={item.instagram || "-"} name="fullname" type="text" placeholder="" readOnly />
            <Field label="Twitter" value={item?.twitter || "-"} name="fullname" type="text" placeholder="" readOnly />
          </div>

          <FieldTextarea label="Alamat" value={item.address || "-"} name="question" placeholder="" required row={4} readOnly />
          <DetailDocument label="KTP" value={item.ktp || ""} name="fullname" type="text" placeholder="" readOnly />
        </div>
      ))}
    </div>
  );
};

export default PersonalDataSubmission;
