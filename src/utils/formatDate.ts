export function formatIndonesianDate(isoString: string | undefined): string {
  if (!isoString) return "";

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
}

export function formatIndonesianDateTime(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  const tanggal = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });

  const waktu = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Makassar",
  });

  return `${tanggal}, ${""} ${waktu}`;
}

export const formatDateRange = (start: string | null, end: string | null) => {
  if (!start || !end) return "-";

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Validasi tanggal
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "-";
  }

  const startDay = startDate.getDate();
  const startMonth = months[startDate.getMonth()];

  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];

  // Jika bulan dan tahun sama
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDay} - ${endDay} ${endMonth}`;
  }

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
};

export const toInputDateFormat = (iso: string): string => {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
