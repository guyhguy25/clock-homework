import { Paper, Typography, Box, IconButton } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useMyReports, useRemoveReport } from "../api/timesheetApi";
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from "@tanstack/react-query";

const MyReports = () => {
    const { data: reports = [], isLoading, error } = useMyReports();
    const removeReportMutation = useRemoveReport();
    const queryClient = useQueryClient();

    const handleDelete = (reportId: string) => {
        removeReportMutation.mutate(reportId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["reports"] });
            },
        });
    };

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
                {reports.map((report) => (
                    <Paper key={report.id} elevation={2} className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Typography variant="subtitle1">Date: {report.date}</Typography>
                                <Typography>Start Time: {report.startTime}</Typography>
                                {report.endTime && <Typography>End Time: {report.endTime}</Typography>}
                                <Typography>Status: {report.status}</Typography>
                            </div>
                            {
                                report.status !== "Approved" && (
                                    <Tooltip title="Delete Report" arrow>
                                        <IconButton
                                            onClick={() => handleDelete(report.id)}
                                            color="error"
                                            size="small"
                                            className="transition-transform duration-150 hover:scale-125 hover:bg-red-100"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        </div>
                    </Paper>
                ))}
            </div>
        </Box>
    );
};

export default MyReports; 