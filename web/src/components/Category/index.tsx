import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    TablePagination,
    Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { useEffect } from 'react';
import { AppDispatch } from '../../../../Redux/Store';
import { AddCategory, GetAllCategory, UpdateCategory, Category, DeleteCategory } from '../../../../Redux/Slice/categorySlicer';
import SnackBar from '../../Common/Snackbar';
export default function BannerTable() {
    const dispatch = useDispatch<AppDispatch>();
    const [rows, setRows] = React.useState<Category[]>([]);
    const [open, setOpen] = React.useState(false);
    const [opendelete, setOpenDelete] = React.useState(false);
    const [deletData, setDeleteData] = React.useState<Category>();
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState({
        categoryImage: '',
        categoryName: '',
        _id: ""
    });
    const [searchText, setSearchText] = React.useState<string>('');
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { category, error, loading } = useSelector((state: RootState) => state.category)
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open: false,
        data: ""
    })

    useEffect(() => {
        dispatch(GetAllCategory());
    }, [dispatch]);

    useEffect(() => {
        setRows(category)
    }, [category])

    // console.log(banner)


    const handleOpenAddDialog = () => {
        setCurrentRow({ categoryImage: '', categoryName: '', _id: " " });
        setIsEditMode(false);
        setOpen(true);
    };

    const handleOpenEditDialog = (row: typeof currentRow, index: number) => {
        setCurrentRow(row);
        setEditingIndex(index);
        setIsEditMode(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDelete(false)
    };

    const handleSave = async () => {
        if (isEditMode && editingIndex !== null) {
            const { categoryImage, categoryName, _id } = currentRow;
            const data = await dispatch(UpdateCategory({
                data: {
                    categoryImage,
                    categoryName,
                    _id,
                },
                id: _id
            }));
            if (data.payload.message) HandleSnackbar(data.payload.message)
        } else {
            const { categoryImage, categoryName, } = currentRow
            const data = await dispatch(AddCategory({
                categoryImage,
                categoryName
            }));
            if (data.payload.message) HandleSnackbar(data.payload.message)
        }
        handleClose();
    };

    const HandleSnackbar = (data: string) => {
        setOpenSnackBar({ open: true, data });
        setTimeout(() => {
            setOpenSnackBar({ ...openSnackBar, open: false });
        }, 2000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target;
        // console.log(e.target)
        setCurrentRow((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }
    const HandleDelete = (row: Category) => {
        setOpenDelete(true);
        setDeleteData(row)
    }
    const DeleteRowData = async () => {
        if (deletData) {
            try {
                const data = await dispatch(DeleteCategory(deletData._id));
                if (data.payload.message) HandleSnackbar(data.payload.message)
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setOpenDelete(false);
            }
        }
    }

    const FilteredData = rows.filter(row => row.categoryName.toLowerCase().includes(searchText));


    return (
        <>
            <TableContainer component={Paper}>
                <div className='flex items-center  mb-5'>
                    <div className="w-[90%] font-extrabold text-xl ml-3">
                        Categories
                    </div>

                    <div className="flex justify-end  items-center">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            className="w-64 px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-SECONDARY_COLOR"
                        />
                        <Tooltip title="Add Banner" className="mr-5">
                            <IconButton onClick={handleOpenAddDialog}>
                                <AddIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="banner table">
                    <TableHead className='bg-slate-300'>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bolder" }}>Category Name</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Category Image</TableCell>
                            <TableCell align="right" style={{ fontWeight: "bolder" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {FilteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={`${row.categoryName}-${index}`}>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.categoryName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center">
                                            <img src={row.categoryImage} height={45} width={45} alt={row.categoryName} className="rounded-md" />
                                        </div>
                                    </TableCell>
                                    <TableCell align="right" >
                                        <EditIcon
                                            className="cursor-pointer text-EDIT_COLOR"
                                            onClick={() => handleOpenEditDialog(row, index)}
                                        />
                                        <DeleteIcon
                                            className="cursor-pointer text-red-700 ml-6"
                                            onClick={() => HandleDelete(row)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditMode ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="categoryName"
                        label="Category Name"
                        type="text"
                        fullWidth
                        value={currentRow.categoryName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="categoryImage"
                        label="Category Image"
                        type="text"
                        fullWidth
                        value={currentRow.categoryImage}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {isEditMode ? 'Save Changes' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={opendelete} onClose={handleClose}>
                <DialogContent>Are you sure you want to delete the category "{`${deletData?.categoryName}`}"?. This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={DeleteRowData} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackBar
                open={openSnackBar.open}
                data={openSnackBar.data}
            />
        </>
    );
}
