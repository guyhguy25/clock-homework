import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile, useUpdateProfile } from "../api/userApi";

const Profile = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const { data: userData, isLoading } = useProfile()

    useEffect(() => {
        if (userData?.user) {
            setFormData({
                firstName: userData.user.firstName,
                lastName: userData.user.lastName,
                email: userData.user.email,
            });
        }
    }, [userData]);

    const { mutate, isError, error, isSuccess, isPending } = useUpdateProfile();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
        });
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box className="flex justify-center items-center min-h-screen">
            <Paper elevation={3} className="p-8 w-full max-w-md">
                <Typography variant="h5" className="!mb-6">
                    Edit Profile
                </Typography>
                {isError && (
                    <Alert severity="error" className="mb-4">
                        {error.message}
                    </Alert>
                )}
                {isSuccess && (
                    <Alert severity="success" className="mb-4">
                        Profile updated successfully
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isPending}
                    >
                        Update Profile
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Profile;