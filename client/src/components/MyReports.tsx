import { Paper, Typography, Box } from "@mui/material";
import { useMyReports } from "../api/timesheetApi";

const MyReports = () => {
    const { data: reports = [], isLoading, error } = useMyReports();

    if (isLoading) {
        return <Typography>Loading reports...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error loading reports</Typography>;
    }

    return (
        <Box className="w-full max-w-md">
            <Typography variant="h6" className="mb-4">
                My Reports
            </Typography>
            <div className="flex flex-col gap-4">
                {reports.map((report, index) => (
                    <Paper key={index} elevation={2} className="p-4">
                        <Typography variant="subtitle1">Date: {report.date}</Typography>
                        <Typography>Start Time: {report.startTime}</Typography>
                        {report.endTime && <Typography>End Time: {report.endTime}</Typography>}
                        <Typography>Status: {report.status}</Typography>
                    </Paper>
                ))}
            </div>
        </Box>
    );
};

export default MyReports; 