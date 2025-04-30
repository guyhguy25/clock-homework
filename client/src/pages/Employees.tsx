import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useMyEmployees } from '../api/userApi';

const Employees = () => {
    const { data, isLoading, error } = useMyEmployees()

    if (isLoading) return <Typography>Loading employees...</Typography>;
    if (error) return <Typography color="error">Error loading employees</Typography>;

    return (
        <TableContainer component={Paper} className="mt-6">
            <Typography variant="h5" className="p-4">My Employees</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((employee: any) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Employees