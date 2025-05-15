import BackButton from "../../../../../components/button/backButton";
import FieldDropdown from "../../../../../components/input/FieldDropDown";

import { SchemaPayment } from "../../../../../data/funding";
import { Group } from "../../../../../types/fundingType";
import { FormSchema, FormSchemaErrors } from "../../../../../types/schemaPayment";
import { TermType } from "../../../../../types/termsType";
import { formatIndonesianDate } from "../../../../../utils/formatDate";

interface FormComplateTermsProps {
  qouta: Group[] | null;
  terms: TermType[] | null;
  formSchemaPayment: FormSchema;
  formSchemaPaymentErrors: FormSchemaErrors;
  handleChangeSchema: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (id: number) => void;
  handleSubmitSchema: () => void;
}

const FormFunding = ({ qouta, terms, formSchemaPayment, formSchemaPaymentErrors, handleChangeSchema, handleCheckboxChange, handleSubmitSchema }: FormComplateTermsProps) => {
  console.log(formSchemaPayment);

  return (
    <>
      <div className="grid grid-cols-3 items-center h-24">
        <div>
          <BackButton url={"/histori-pengajuan"} />
        </div>
        <h1 className="text-center text-3xl w-full font-bold">Skema Pendanaan</h1>
      </div>
      <div className="flex flex-col gap-6">
        <FieldDropdown
          label="Skema Pengajuan"
          name="submissionScheme"
          type="select"
          value={formSchemaPayment.submissionScheme}
          onChange={handleChangeSchema}
          options={
            SchemaPayment?.map((item) => ({
              label: item.label,
              value: item.key,
            })) ?? []
          }
          error={!!formSchemaPaymentErrors.submissionScheme}
          need
        />
        {formSchemaPayment.submissionScheme === "Pendanaan" && (
          <>
            <FieldDropdown
              label="Periode Pengajuan"
              name="groupId"
              type="select"
              value={formSchemaPayment.groupId !== null && formSchemaPayment.periodId !== null ? `${formSchemaPayment.groupId}|${formSchemaPayment.periodId}` : ""}
              onChange={handleChangeSchema}
              options={
                qouta?.map((item) => ({
                  label: `${item.group} (${formatIndonesianDate(item.startDate)} - ${formatIndonesianDate(item.endDate)})`,
                  value: `${item.id}|${item.periodId}`,
                })) ?? []
              }
              error={!!formSchemaPaymentErrors.groupId}
              need
            />
            <div className="mb-4">
              <label className="block mb-2 text-base font-medium">
                Prasyarat Penerimaan Pendanaan
                <span className="text-RED01 ml-1">*</span>
              </label>

              {(terms ?? []).map((term) => (
                <label key={term.id} className="flex items-center space-x-2 mb-1">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 "
                    checked={formSchemaPayment.termsConditionId.includes(term.id)}
                    onChange={() => handleCheckboxChange(term.id)}
                  />

                  <span>{term.terms}</span>
                </label>
              ))}

              {formSchemaPaymentErrors.termsConditionId && <p className="text-sm text-RED01 mt-2">{formSchemaPaymentErrors.termsConditionId}</p>}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={handleSubmitSchema} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
          Kirim
        </button>
      </div>
    </>
  );
};

export default FormFunding;
