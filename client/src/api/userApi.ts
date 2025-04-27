import {
	useQuery,
	useMutation,
	UseMutationResult,
	UseQueryResult,
} from "@tanstack/react-query";
import { API } from "./api";
import { User } from "../types/User";
import { Manager } from "../types/Manager";

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	managerId: number;
}

interface LoginResponse {
	data: {
		token: string;
		user: User;
	};
}
interface RegisterResponse {
	data: {
		user: User;
	};
}
interface AllManagersResponse {
	managers: Manager[];
}

export const useLogin = (): UseMutationResult<
	LoginResponse,
	Error,
	LoginRequest
> => {
	return useMutation({
		mutationFn: (data) => API.post("/auth/login", data),
	});
};

export const useRegister = (): UseMutationResult<
	RegisterResponse,
	Error,
	RegisterRequest
> => {
	return useMutation({
		mutationFn: (data) =>
			API.post("/auth/register", data).then((res) => res.data),
	});
};

export const useProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: () => API.get("/users/profile").then((res) => res.data),
	});
};

export const useManagers = (): UseQueryResult<AllManagersResponse, Error> => {
	return useQuery({
		queryKey: ["managers"],
		queryFn: () => API.get("/users/managers").then((res) => res.data),
	});
};

export const useMyEmployees = () => {
	return useQuery({
		queryKey: ["myEmployees"],
		queryFn: () => API.get("/users/my-employees").then((res) => res.data),
	});
};
