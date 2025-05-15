import { SubmissionProgress } from "../../../../../types/submissionType";
import { getStatusColor } from "../../../../../utils/colorsTimeline";
import { formatIndonesianDateTime } from "../../../../../utils/formatDate";
import { FaCheck } from "react-icons/fa";

interface TimelineHistoryProps {
  data?: SubmissionProgress[] | null;
}

const TimelineHistory = ({ data }: TimelineHistoryProps) => {
  return (
    <div>
      {data?.map((item, id) => (
        <div key={id} className="flex items-start space-x-2">
          {/* Column 1: Status */}
          {/* <div className="w-[15%] mt-4 flex items-center justify-center font-semibold text-center py-2 bg-GREY01 rounded-md">{item.status}</div> */}
          <div className={`w-[15%] mt-4 flex items-center justify-center font-semibold text-center py-2 rounded-md ${getStatusColor(item.status)}`}>{item.status}</div>
          {/* Column 2 & 3 wrapper */}
          <div className="flex w-[85%] ">
            {/* space-x-4 */}
            {/* Column 2: Timeline */}
            <div className="relative flex flex-col items-center px-4">
              {/* Garis vertikal */}
              <div className="absolute top-0 bottom-0 w-[4px] bg-PRIMARY01" />

              {/* Lingkaran dengan centang */}
              <div className="w-6 h-6 bg-PRIMARY01 rounded-full border-2 border-PRIMARY01 dark:border-gray-800 z-10 mt-4 flex items-center justify-center text-white text-xs">
                <FaCheck />
              </div>
            </div>
            {/* Column 3: Content */}
            <div key={item.id} className="flex-1 py-3 px-3 hover:bg-gray-100 border-b border-BORDER01 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-900">{formatIndonesianDateTime(item.createdAt)}</h3>
              <h3 className="text-lg font-semibold mb-6 text-[#667085]">{item?.comment}</h3>
              <p className="text-[#667085]">
                {item.status === "Pending" ? "Created by: " : "Updated by: "}
                {item.createdBy ?? "-"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineHistory;
