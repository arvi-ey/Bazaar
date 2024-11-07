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
import { useDispatch, useSelector } from 'react-redux';
import { AddBanner, GetBanners, UpdateBanner } from '../../../../Redux/Slice/bannerSlicer';
import { RootState } from '../../../../Redux/Store';
import { useEffect } from 'react';
import { Banner } from '../../../../Redux/Slice/bannerSlicer';
import { AppDispatch } from '../../../../Redux/Store';

export default function BannerTable() {
    const dispatch = useDispatch<AppDispatch>();
    const [rows, setRows] = React.useState<Banner[]>([]);
    const [open, setOpen] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState({
        title: '',
        image: '',
        _id: ""
    });
    const [searchText, setSearchText] = React.useState<string>('');
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { banner, error, loading } = useSelector((state: RootState) => state.banner)

    useEffect(() => {
        dispatch(GetBanners());
    }, [dispatch]);

    useEffect(() => {
        setRows(banner)
    }, [banner])

    // console.log(banner)


    const handleOpenAddDialog = () => {
        setCurrentRow({ title: '', image: '', _id: " " });
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
    };

    const handleSave = async () => {
        if (isEditMode && editingIndex !== null) {
            const { image, title, _id } = currentRow;
            await dispatch(UpdateBanner({
                data: {
                    image,
                    title,
                    _id,
                },
                id: _id
            }));
        } else {
            const { title, image } = currentRow;
            await dispatch(AddBanner({
                image,
                title,
            }));
        }
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, id } = e.target;
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

    const FilteredData = rows.filter(row => row.title.toLowerCase().includes(searchText));

    return (
        <>
            <TableContainer component={Paper}>
                <div className='flex items-center  mb-5'>
                    <div className="w-[90%] font-extrabold text-xl ml-3">
                        Banners
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
                            <TableCell style={{ fontWeight: "bolder" }}>Banner Title</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Image</TableCell>
                            <TableCell align="right" style={{ fontWeight: "bolder" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {FilteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={`${row.title}-${index}`}>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="flex justify-center">
                                            <img src={row.image} height={100} width={100} alt={row.title} className="rounded-md" />
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <EditIcon
                                            className="cursor-pointer"
                                            onClick={() => handleOpenEditDialog(row, index)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
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
                        name="title"
                        label="Banner Title"
                        type="text"
                        fullWidth
                        value={currentRow.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="image"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={currentRow.image}
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
        </>
    );
}
