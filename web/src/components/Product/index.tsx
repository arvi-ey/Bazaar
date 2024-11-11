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
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../../../Redux/Store';
import { AddProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct, UpdateProductData } from "../../../../Redux/Slice/productsSlicer"
import { GetAllCategory } from '../../../../Redux/Slice/categorySlicer';
import SnackBar from '../../Common/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
interface Image {
    img1: string,
    img2: string,
    img3: string,
}
export default function index() {
    const dispatch = useDispatch<AppDispatch>();
    const [rows, setRows] = React.useState<GetProduct[]>([]);
    const [open, setOpen] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState({
        description: '',
        price: 0,
        category: '',
        stock: 0,
        images: [],
        ratings: 0,
        title: '',
        deliveryTime: 0,
        _id: ""
    });
    const [searchText, setSearchText] = React.useState<string>('');
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { products, } = useSelector((state: RootState) => state.product)
    const { category, } = useSelector((state: RootState) => state.category)
    const [selectCategory, setselectCategory] = React.useState('');
    const [image, setImage] = useState<Image>({
        img1: '',
        img2: '',
        img3: '',
    })
    const [opendelete, setOpenDelete] = React.useState(false);
    const [deletData, setDeleteData] = React.useState<GetProduct>();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open: false,
        data: ""
    })
    //////addddddddddddddddddddd
    const handleChangeSelect = (event: SelectChangeEvent) => {
        setselectCategory(event.target.value as string);
    };

    useEffect(() => {
        dispatch(GetAllProducts());
        dispatch(GetAllCategory());
    }, [dispatch]);


    useEffect(() => {
        setRows(products)
    }, [products])

    const handleOpenAddDialog = () => {
        setCurrentRow({
            description: '',
            price: 0,
            category: '',
            stock: 0,
            images: [],
            ratings: 0,
            title: '',
            deliveryTime: 0,
            _id: ""
        });

        setIsEditMode(false);
        setOpen(true);
    };


    const handleOpenEditDialog = (row: typeof currentRow, index: number) => {
        setCurrentRow(row);
        setImage({
            img1: row.images[0],
            img2: row.images[1],
            img3: row.images[2]
        })
        setselectCategory(row.category)
        setEditingIndex(index);
        setIsEditMode(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const obj: GetProduct = {
            title: currentRow.title,
            description: currentRow.description,
            price: Number(currentRow.price),
            category: selectCategory,
            stock: Number(currentRow.stock),
            images: [image.img1, image.img2, image.img3],
            deliveryTime: Number(currentRow.deliveryTime),
        }
        if (isEditMode && editingIndex !== null) {
            const { _id } = currentRow;
            const data = await dispatch(UpdateProductData({
                data: obj,
                id: _id
            }))
            if (data.payload.message) HandleSnackbar(data.payload.message)
        } else {
            const data = await dispatch(AddProduct(obj));
            if (data.payload.message) HandleSnackbar(data.payload.message)
        }
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target;
        // console.log(e.target)
        setCurrentRow((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const HandleImnageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage((prev) => ({ ...prev, [event.target.name]: event.target.value }))

    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

    const HandleDelete = (row: GetProduct) => {
        setOpenDelete(true);
        setDeleteData(row)
    }


    const HandleSnackbar = (data: string) => {
        setOpenSnackBar({ open: true, data });
        setTimeout(() => {
            setOpenSnackBar({ ...openSnackBar, open: false });
        }, 2000)
    }

    const DeleteRowData = async () => {
        if (deletData) {
            try {
                const data = await dispatch(DeleteProduct(deletData._id));
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

    return (
        <>
            <TableContainer component={Paper}  >
                <div className='flex items-center  mb-5'>
                    <div className="w-[90%] font-extrabold text-xl ml-3">
                        Products
                    </div>

                    <div className="flex justify-end  items-center">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            className="w-64 px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-SECONDARY_COLOR"
                        />
                        <Tooltip title="Add Product" className="mr-5">
                            <IconButton onClick={handleOpenAddDialog}>
                                <AddIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="banner table">
                    <TableHead className='bg-slate-300'>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Category</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder", width: "20%" }}>Description</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Image</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Price</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Stock</TableCell>
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Rating</TableCell>
                            <TableCell align="right" style={{ fontWeight: "bolder" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.title}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.category}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.description}
                                    </TableCell>
                                    {
                                        row.images && row.images.length > 0 ?
                                            <TableCell align="center">
                                                <div className="flex justify-center">
                                                    <img src={row.images[0]} height={50} width={50} alt={row.images[0]} className="rounded-md" />
                                                </div>
                                            </TableCell>
                                            : null
                                    }
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.price}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.stock}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ fontWeight: "bold" }} >
                                        {row.ratings}
                                    </TableCell>
                                    <TableCell align="right">
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
                <DialogContent >
                    <TextField
                        margin="dense"
                        name="title"
                        label="Product Title"
                        type="text"
                        fullWidth
                        value={currentRow.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Product Description"
                        type="text"
                        fullWidth
                        value={currentRow.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Product Price"
                        type="number"
                        fullWidth
                        value={currentRow.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="img1"
                        label="Product Image 1"
                        type="text"
                        fullWidth
                        value={image.img1 || ""}
                        onChange={HandleImnageChange}
                    />
                    <TextField
                        margin="dense"
                        name="img2"
                        label="Product Image 2"
                        type="text"
                        fullWidth
                        value={image.img2 || ""}
                        onChange={HandleImnageChange}
                    />
                    <TextField
                        margin="dense"
                        name="img3"
                        label="Product Image 3"
                        type="text"
                        fullWidth
                        value={image.img3 || ""}
                        onChange={HandleImnageChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectCategory}
                            label="Select Category"
                            onChange={handleChangeSelect}
                        >
                            {category?.map((category, index) => {
                                return (
                                    <MenuItem key={index} value={category.categoryName}>{category.categoryName}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="stock"
                        label="Product Stock"
                        type="number"
                        fullWidth
                        value={currentRow.stock}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="ratings"
                        label="Product Rating"
                        type="number"
                        fullWidth
                        value={currentRow.ratings}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="deliveryTime"
                        label="Delivery Time"
                        type="number"
                        fullWidth
                        value={currentRow.deliveryTime}
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
                <DialogContent>Are you sure you want to delete the category "{`${deletData?.title}`}"?. This action cannot be undone.</DialogContent>
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
