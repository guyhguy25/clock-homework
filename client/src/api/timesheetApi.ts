import { useMutation, UseMutationResult } from "@tanstack/react-query";
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
