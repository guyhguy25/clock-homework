import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryClient } from "@tanstack/react-query";
import { useMyEmployeesReport, useReviewReport } from "../api/timesheetApi";

interface Report {
    id: number;
    date: string;
    startTime: string;
    endTime: string | null;
    status: "Pending" | "Approved" | "Rejected";
    employee: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
}

const Manager = () => {
    const queryClient = useQueryClient();

    const { data: reports = [], isLoading } = useMyEmployeesReport()

    const { mutate, isPending } = useReviewReport()

    const handleApprove = (reportId: number) => {
        mutate({ reportId, status: "Approved" }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["employees-reports"] });
            },
        });
    };

    const handleReject = (reportId: number) => {
        mutate({ reportId, status: "Rejected" }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["employees-reports"] });
            },
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box className="p-6">
            <Typography variant="h4" className="!mb-6">
                Employee Reports
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report: Report) => (
                            <TableRow key={report.id}>
                                <TableCell>
                                    {report.employee.firstName} {report.employee.lastName}
                                </TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>{report.startTime}</TableCell>
                                <TableCell>{report.endTime || "-"}</TableCell>
                                <TableCell>{report.status}</TableCell>
                                <TableCell>
                                    {report.status !== "Approved" && (
                                        <>
                                            <IconButton
                                                color="success"
                                                onClick={() => handleApprove(report.id)}
                                                disabled={isPending}
                                                className="!p-0"
                                            >
                                                <CheckIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleReject(report.id)}
                                                disabled={isPending}
                                                className="!p-0"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Manager;