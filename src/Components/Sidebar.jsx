import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ConfigurationIcon,
  DashboardIcon,
  DiscountIcon,
  EmployeeIcon,
  InventoryIcon,
  OrdersIcon,
  PaymentIcon,
  ProductsIcon,
  RawMaterialsIcon,
  RecipeIcon,
  TodoIcon,
  SupportIcon,
  SettingsIcon,
  NotificationIcon,
  BasketIcon,
  CustomerIcon,
} from "../assets/Icons/Svg";

const SIDEBAR_LINKS_TOP = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: ProductsIcon,
    href: "/products",
  },
  {
    label: "Baskets",
    icon: BasketIcon,
    href: "/baskets",
  },
  {
    label: "Orders",
    icon: OrdersIcon,
    href: "/orders",
  },
  {
    label: "Inventory",
    icon: InventoryIcon,
    href: "/inventory",
  },
  {
    label: "Discounts & Promotions",
    icon: DiscountIcon,
    href: "/discounts",
  },
  {
    label: "Customers",
    icon: CustomerIcon,
    href: "/customers",
  },
  {
    label: "Holidays",
    icon: CustomerIcon,
    href: "/holidays",
  },
  {
    label: "Timeslots Configuration",
    icon: CustomerIcon,
    href: "/timeslots-configuration",
  },
  {
    label: "ZIP Code Configuration",
    icon: ConfigurationIcon,
    href: "/configuration",
  },
  {
    label: "Payment History",
    icon: PaymentIcon,
    href: "/payment-history",
  },
];
const SIDEBAR_LINKS_BOTTOM = [
  {
    label: "Support",
    icon: SupportIcon,
    href: "/support",
  },
  {
    label: "Notifications",
    icon: NotificationIcon,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
];

const Sidebar = () => {
  return (
    <>
      <nav className="sidebar w-20 bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[280px] py-3 px-3 font-[sans-serif] overflow-auto">
        <Link href="/dashboard" className="nav-item">
          LOGO
        </Link>
        <ul className="custom_nagivation">
          {SIDEBAR_LINKS_TOP?.map(({ label, href, icon }, idx) => (
            <li>
              <NavLink
                key={idx}
                to={href}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active-link" : ""}`
                }
              >
                <div className="nav-item">
                  <div className="icon">{icon}</div>
                  {label}
                </div>
              </NavLink>
            </li>
          ))}
          <div className="horizontal-line w-full h-px bg-gray-300 my-4"></div>
          {SIDEBAR_LINKS_BOTTOM?.map(({ label, href, icon }, idx) => (
            <li>
            <NavLink
              key={idx}
              to={href}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active-link" : ""}`
              }
            >
              <div className="nav-item">
                <div className="icon">{icon}</div>
                {label}
              </div>
            </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
