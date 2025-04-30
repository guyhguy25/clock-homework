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
	role: string;
	managerId: number;
}

interface LoginResponse {
	data: {
		token: string;
		user: User;
	};
}
interface RegisterResponse {
	user: User;
	token: string;
}
interface AllManagersResponse {
	managers: Manager[];
}

interface UpdateProfileRequest {
	firstName: string;
	lastName: string;
	email: string;
}

interface UpdateProfileResponse {
	message: string;
	user: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		role: string;
	};
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
		queryKey: ["user"],
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
		queryFn: () =>
			API.get("/users/my-employees").then((res) => res.data.employees),
	});
};

export const useUpdateProfile = (): UseMutationResult<
	UpdateProfileResponse,
	Error,
	UpdateProfileRequest
> => {
	return useMutation({
		mutationFn: (data) =>
			API.put("/users/edit-profile", data).then((res) => res.data),
	});
};
