import { FaCheck } from "react-icons/fa";
interface Step {
  label: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <ol className="flex items-center w-full ">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <li
            key={index}
            className={`flex flex-col items-center w-full h-full relative ${!isLast ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-4 after:inline-block after:absolute after:top-5 after:left-1/2 after:transform  after:z-[0]' : ""} ${
              isCompleted ? "after:border-PRIMARY01" : "after:border-gray-300"
            }`}
          >
            <span
              className={`flex z-10 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full text-white text-sm font-bold
              ${isCompleted ? "bg-PRIMARY01" : isActive ? "bg-blue-400" : "bg-gray-300"}`}
            >
              {isCompleted ? (
                <span className="text-xl font-semibold">
                  <FaCheck />
                </span>
              ) : (
                <span className="font-semibold text-xl">{index + 1}</span>
              )}
            </span>
            <span className="mt-2 text-lg text-center font-medium">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
