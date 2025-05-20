interface Section1Props {
  label: string;
  total: number;
  description: string;
}

const Section_1 = ({ label, total, description }: Section1Props) => {
  return (
    <div className="bg-white rounded-md flex flex-col p-4 gap-2 shadow-sm">
      <h3 className="text-lg font-medium">{label}</h3>
      <span className="text-3xl font-semibold text-PRIMARY01">{total}</span>
      <span className="text-base text-GREY04">{description}</span>
    </div>
  );
};

export default Section_1;
