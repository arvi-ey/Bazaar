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
import { AddProduct, GetAllProducts, GetProduct } from "../../../../Redux/Slice/productsSlicer"
import { GetAllCategory } from '../../../../Redux/Slice/categorySlicer';
import { TabBarIcon } from '../../../../components/navigation/TabBarIcon';

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
    });
    const [searchText, setSearchText] = React.useState<string>('');
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { products, } = useSelector((state: RootState) => state.product)
    const { category, } = useSelector((state: RootState) => state.category)
    const [selectCategory, setselectCategory] = React.useState('');
    const [image, setImage] = useState<Image>({
        img1: '',
        img2: '',
        img3: '',
    })

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
        });

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
            // const { categoryImage, categoryName, _id } = currentRow;
            // await dispatch(UpdateCategory({
            //     data: {
            //         categoryImage,
            //         categoryName,
            //         _id,
            //     },
            //     id: _id
            // }));
        } else {
            const obj: GetProduct = {
                title: currentRow.title,
                description: currentRow.description,
                price: Number(currentRow.price),
                category: selectCategory,
                stock: Number(currentRow.stock),
                images: [image.img1, image.img2, image.img3],
                deliveryTime: Number(currentRow.deliveryTime),
            };
            await dispatch(AddProduct(obj));
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

    // const FilteredData = rows.filter(row => row.categoryName.toLowerCase().includes(searchText));


    return (
        <>
            <TableContainer component={Paper}>
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
                            <TableCell align="center" style={{ fontWeight: "bolder" }}>Description</TableCell>
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
                                                    <img src={row.images[0]} height={100} width={100} alt={row.images[0]} className="rounded-md" />
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
                                            className="cursor-pointer"
                                            // onClick={() => handleOpenEditDialog(row, index)}
                                            onClick={() => console.log(row)}
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
                        value={image.img1}
                        onChange={HandleImnageChange}
                    />
                    <TextField
                        margin="dense"
                        name="img2"
                        label="Product Image 2"
                        type="text"
                        fullWidth
                        value={image.img2}
                        onChange={HandleImnageChange}
                    />
                    <TextField
                        margin="dense"
                        name="img3"
                        label="Product Image 3"
                        type="text"
                        fullWidth
                        value={image.img3}
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
        </>
    );
}
