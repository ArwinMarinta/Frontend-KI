import FieldDropdown from "../../../../components/input/FieldDropDown";
import NextButton from "./nextButton";

export type FormStepProps = {
  // currentStep: number;
  // setCurrentStep: (step: number) => void;
  submissionType: string;
  error: boolean;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  handleNextStep: () => void;
};

const Form_1 = ({ submissionType, error, handleChange, handleNextStep }: FormStepProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col items-center mt-20">
          <h2 className="text-[32px] font-semibold">Jenis Pengajuan</h2>
          <p className="text-justify mt-3">Pilih jenis pengajuan Kekayaan Intelektual (KI) yang ingin Anda daftarkan</p>
        </div>
      </div>
      <div className="mt-20">
        <FieldDropdown
          label="Jenis Pengajuan"
          name="role"
          type="select"
          value={submissionType}
          onChange={handleChange}
          options={[
            { label: "Hak Cipta", value: "Hak Cipta" },
            { label: "Paten", value: "Paten" },
            { label: "Merek", value: "Merek" },
            { label: "Desain Industri", value: "Desain Industri" },
          ]}
          error={error}
          need
        />
      </div>
      <div className="mt-20 w-full flex justify-end">
        <NextButton onClick={handleNextStep} />
      </div>
    </div>
  );
};

export default Form_1;
