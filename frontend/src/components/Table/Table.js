import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Table.css'
import { deleteBook } from '../../config';

function TableComponent({ handleEdit, books, triggerRefresh }) {

    async function onDeleteBook(row) {
        if (window.confirm(`Are you sure you want to delete: ${row.title} by ${row.author}?`)) {
            await fetch(`${deleteBook}${row.id}`, { method: "DELETE" });
            await triggerRefresh();
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#0f3833' }}>
                    <TableRow>
                        <TableCell sx={{ color: "white" }} >ID</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Title</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Author</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Category</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Price</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">Total Count</TableCell>
                        <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {books && <TableBody>
                    {books.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.author}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.totalCount}</TableCell>
                            <TableCell align="right">
                                <div className='action'>
                                    <Button variant="contained" color="success" onClick={() => { handleEdit(row) }} >
                                        <EditIcon /> Edit
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => { onDeleteBook(row) }}>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
        </TableContainer>
    );
}


export default TableComponent;