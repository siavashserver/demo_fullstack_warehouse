import {
  LineChartOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import NavBar, { NavBarItem } from "./NavBar";

const { Header } = Layout;

const menuItems: NavBarItem[] = [
  {
    label: "Home",
    link: "/",
    icon: <ShopOutlined />,
  },
  {
    label: "Orders",
    link: "/CustomerOrders",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "Products",
    link: "/ProductsSummary",
    icon: <ShoppingOutlined />,
  },
  {
    label: "Revenue",
    link: "/MonthlyGrossRevenue",
    icon: <LineChartOutlined />,
  },
];

const PageHeader = () => {
  return (
    <Header>
      <NavBar items={menuItems} />
    </Header>
  );
};

export default PageHeader;
