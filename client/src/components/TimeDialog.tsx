import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface TimeDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    onStartTimeChange: (time: Dayjs | null) => void;
    onEndTimeChange: (time: Dayjs | null) => void;
    existingReport: any;
    isSaveDisabled: boolean;
}

const TimeDialog = ({
    open,
    onClose,
    onSave,
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange,
    existingReport,
    isSaveDisabled,
}: TimeDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Times</DialogTitle>
            <DialogContent className="flex flex-col gap-4 mt-2 !pt-2">
                {existingReport && (
                    <Alert severity="info">
                        You have already clocked in at {existingReport.startTime}
                        {existingReport.endTime ? ` and clocked out at ${existingReport.endTime}` : ''}
                    </Alert>
                )}
                <TimeField
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => onStartTimeChange(newValue)}
                    format="HH:mm"
                    disabled={!!existingReport}
                    sx={{
                        ".MuiPickersOutlinedInput-root": {
                            borderRadius: '10px'
                        }
                    }}
                />
                <TimeField
                    label="End Time"
                    value={endTime}
                    onChange={(newValue) => onEndTimeChange(newValue)}
                    format="HH:mm"
                    disabled={!!existingReport?.endTime}
                    sx={{
                        ".MuiPickersOutlinedInput-root": {
                            borderRadius: '10px'
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={onSave}
                    disabled={isSaveDisabled}
                    variant="contained"
                >
                    {existingReport ? "Clock Out" : "Clock In"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TimeDialog; 