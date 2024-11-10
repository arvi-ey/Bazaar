import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const commonStyle = {
    className: 'text-TEXT_COLOR',
};

const fontSize = 'medium'

export const RouteData = [
    {
        icon: <BarChartIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Analytics',
        route: "",
    },
    {
        icon: <PersonOutlineOutlinedIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Users',
        route: 'user'
    },
    {
        icon: <Inventory2OutlinedIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Product',
        route: 'product'
    },
    {
        icon: <ProductionQuantityLimitsOutlinedIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Order',
        route: 'order'
    },
    {
        icon: <ViewCarouselIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Banner',
        route: 'banner'
    },
    {
        icon: <CategoryIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Category',
        route: 'category'
    },
    {
        icon: <SettingsIcon {...commonStyle} fontSize={fontSize} />,
        text: 'Settings',
        route: 'settings'
    },

]