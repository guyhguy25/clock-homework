import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import MyReports from "../components/MyReports";
import Calendar from "../components/Calendar";
import TimeDialog from "../components/TimeDialog";
import { useClockIn, useClockOut, useMyReports } from "../api/timesheetApi";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [existingReport, setExistingReport] = useState<any>(null);
  const queryClient = useQueryClient();
  const clockInMutation = useClockIn();
  const clockOutMutation = useClockOut();
  const { data: reports = [] } = useMyReports();

  const handleDateSelect = (newDate: Dayjs | null) => {
    if (newDate) {
      setSelectedDate(newDate);
      const dateStr = newDate.format("YYYY-MM-DD");
      const existing = reports.find(r => r.date === dateStr);
      setExistingReport(existing);

      if (existing) {
        setStartTime(dayjs(existing.startTime, "HH:mm"));
        setEndTime(existing.endTime ? dayjs(existing.endTime, "HH:mm") : null);
      } else {
        setStartTime(null);
        setEndTime(null);
      }
      setOpenDialog(true);
    }
  };

  const handleSave = () => {
    if (selectedDate && startTime) {
      const date = selectedDate.format("YYYY-MM-DD");
      const start = startTime.format("HH:mm");

      if (endTime) {
        clockOutMutation.mutate(
          { date, endTime: endTime.format("HH:mm") },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["reports"] });
            },
          }
        );
      } else if (!existingReport) {
        clockInMutation.mutate(
          { date, startTime: start },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["reports"] });
            },
          }
        );
      }
      setOpenDialog(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-8 relative min-h-screen">
      {/* Banner Image */}
      <div className="mb-8">
        <img
          src="/BannerMdclone.png"
          alt="Banner"
          className="h-16 w-auto"
        />
      </div>

      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        reports={reports}
      />

      <MyReports />

      <TimeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        existingReport={existingReport}
        isSaveDisabled={!startTime || (!!existingReport && !endTime)}
      />
    </div>
  );
};

export default Dashboard;
