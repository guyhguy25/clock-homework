import {
	useMutation,
	UseMutationResult,
	useQuery,
	UseQueryResult,
} from "@tanstack/react-query";
import { API } from "./api";

interface ClockInResponse {
	data: {
		userId: number;
		date: string;
		startTime: string;
		endTime: null;
		status: "Pending";
	};
}
interface ClockInRequest {
	date: string;
	startTime: string;
}

interface ClockOutResponse {
	data: {
		userId: number;
		date: string;
		startTime: string;
		endTime: string;
		status: "Completed";
	};
}

interface ClockOutRequest {
	date: string;
	endTime: string;
}

interface Report {
	id: string;
	date: string;
	startTime: string;
	endTime: string | null;
	status: "Pending" | "Approved" | "Rejected";
}

interface ReportResponse {
	data: {
		date: string;
		startTime: string;
		endTime: string | null;
	};
}

interface ReportRequest {
	date: string;
	start: string;
	end: string | null;
}

export const useClockIn = (): UseMutationResult<
	ClockInResponse,
	Error,
	ClockInRequest
> => {
	return useMutation({
		mutationFn: (data) =>
			API.post("/reports/clock-in", data).then((res) => res.data),
	});
};

export const useClockOut = (): UseMutationResult<
	ClockOutResponse,
	Error,
	ClockOutRequest
> => {
	return useMutation({
		mutationFn: (data) =>
			API.post("/reports/clock-out", data).then((res) => res.data),
	});
};

export const useSaveReport = (): UseMutationResult<
	ReportResponse,
	Error,
	ReportRequest
> => {
	return useMutation({
		mutationFn: (data) =>
			API.post("/reports/", data).then((res) => res.data),
	});
};

export const useMyReports = (): UseQueryResult<Report[]> => {
	return useQuery({
		queryKey: ["reports"],
		queryFn: () =>
			API.get("/reports/my-reports").then((res) => res.data.reports),
	});
};

export const useRemoveReport = (): UseMutationResult<void, Error, string> => {
	return useMutation({
		mutationFn: (reportId: string) =>
			API.delete(`/reports/${reportId}`).then((res) => res.data),
	});
};

export const useMyEmployeesReport = () => {
	return useQuery({
		queryKey: ["employees-reports"],
		queryFn: () =>
			API.get("/reports/employees-reports").then(
				(res) => res.data.employees
			),
	});
};

export const useReviewReport = () => {
	return useMutation({
		mutationFn: ({
			reportId,
			status,
		}: {
			reportId: number;
			status: string;
		}) =>
			API.patch(`/reports/review/${reportId}`, { status }).then(
				(res) => res.data
			),
	});
};
