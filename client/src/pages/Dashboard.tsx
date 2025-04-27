import { useState } from "react";
import { DateCalendar, TimePicker, LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import MyReports from "../components/MyReports";
import { useClockIn, useClockOut } from "../api/timesheetApi";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const clockInMutation = useClockIn();
  const clockOutMutation = useClockOut();

  const handleDateSelect = (newDate: Dayjs | null) => {
    if (newDate) {
      setSelectedDate(newDate);
      setStartTime(null);
      setEndTime(null);
      setOpenDialog(true);
    }
  };

  const handleSave = () => {
    if (selectedDate && startTime) {
      const date = selectedDate.format("DD/MM/YYYY");
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
      } else {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col items-center mt-10 gap-8">
        <DateCalendar value={selectedDate} onChange={handleDateSelect} />
        <MyReports />
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Times</DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2 !pt-2">
          <TimeField
            label="Start Time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            format="HH:mm"
          />
          <TimeField
            label="End Time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            format="HH:mm"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={!startTime}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default Dashboard;
