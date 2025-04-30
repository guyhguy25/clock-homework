import { DateCalendar, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface CalendarProps {
    selectedDate: Dayjs | null;
    onDateSelect: (date: Dayjs | null) => void;
    reports: any[];
}

const Calendar = ({ selectedDate, onDateSelect, reports }: CalendarProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={selectedDate}
                onChange={onDateSelect}
                sx={{
                    '& .MuiPickersDay-root': {
                        '&.approved': {
                            backgroundColor: 'rgba(0, 255, 8, 1)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 255, 8, 0.4)',
                            },
                        },
                        '&.pending': {
                            backgroundColor: 'rgb(255, 166, 0)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 166, 0, 0.4)',
                            },
                        },
                        '&.rejected': {
                            backgroundColor: 'rgba(255, 0, 0, 1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.4)',
                            },
                        },
                    },
                }}
                slots={{
                    day: (props) => {
                        const { day, ...other } = props;
                        const dateStr = day.format("YYYY-MM-DD");
                        const report = reports.find(r => r.date === dateStr);
                        const className = report?.status.toLowerCase() || '';
                        return <PickersDay {...other} day={day} className={className} />;
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default Calendar; 