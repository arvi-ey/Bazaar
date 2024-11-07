import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import User from "../User/index"
import Analysis from "../Analytics/index";
import Settings from "../Settings/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Redux/Store/index"
import SettingsIcon from '@mui/icons-material/Settings';
import UserImage from "../../assets/demo_user.jpg"
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import Banner from "../Banner/index"
import Category from "../Category/index"
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function index() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [component, setComponent] = useState("Analytics")
    const dispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user)




    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const ListData = [
        {
            icon: <BarChartIcon />,
            text: 'Analytics',
        },
        {
            icon: <PersonOutlineOutlinedIcon />,
            text: 'Users',
        },
        {
            icon: <Inventory2OutlinedIcon />,
            text: 'Product',
        },
        {
            icon: <ProductionQuantityLimitsOutlinedIcon />,
            text: 'Order',
        },
        {
            icon: <ViewCarouselIcon />,
            text: 'Banner',
        },
        {
            icon: <CategoryIcon />,
            text: 'Category',
        },
        {
            icon: <SettingsIcon />,
            text: 'Settings',
        },

    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className='bg-white' >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                                color: "black"
                            },

                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className='text-black font-bold' >
                        dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div className='flex flex-col h-full justify-between' >
                    <List>
                        {ListData.map((data, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                    onClick={() => setComponent(data.text)}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {data.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        className="text-TEXT_COLOR"
                                        primary={data.text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <div className={`mb-20 flex gap-2 ml-1 items-center cursor-pointer hover:bg-slate-100`} >
                        <img src={user?.profile_picture ? user.profile_picture : UserImage} alt="user_image" width="60px" height="60" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                        {open &&
                            <>
                                <div>
                                    <p className='text-sm  text-TEXT_COLOR' >{user?.name}</p>
                                    <p className='text-sm  text-TEXT_COLOR' >{user?.email}</p>
                                </div>
                                <div className='gap-1 flex flex-col'>
                                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}  >
                <DrawerHeader />
                {
                    component === "Analytics" && <Analysis />
                    || component === "Users" && <User />
                    || component === "Product" && <h1>Product</h1>
                    || component === "Order" && <h1>Order</h1>
                    || component === "Category" && <Category />
                    || component === "Setting" && <Settings />
                    || component === "Banner" && <Banner />
                }
            </Box>
        </Box >
    );
}
