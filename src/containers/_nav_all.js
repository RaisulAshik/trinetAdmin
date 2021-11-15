import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Theme"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Colors",
    to: "/theme/colors",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Typography",
    to: "/theme/typography",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Components"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "About Us",
    to: "/about-us",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Company Details",
    to: "/company-detail",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Privacy Policy",
    to: "/privacy-policy",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Terms & Conditions",
    to: "/terms-and-condition",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Banner",
    to: "/banner",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "FAQ",
    route: "/faq",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "FAQ List",
        to: "/faq/faq-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "FAQ Add",
        to: "/faq/faq-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "FAQ Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "FAQ Text",
    to: "/faq-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Services",
    route: "/service",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Service Category List",
        to: "/service/service-category-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Category Add",
        to: "/service/service-category-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Category Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Subcategory List",
        to: "/service/service-subcategory-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Subcategory Add",
        to: "/service/service-subcategory-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Subcategory Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Service Text",
    to: "/service-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Portfolio",
    route: "/portfolio",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Portfolio List",
        to: "/portfolio/portfolio-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Portfolio Add",
        to: "/portfolio/portfolio-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Portfolio Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Portfolio Text",
    to: "/portfolio-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Team",
    route: "/team",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Team List",
        to: "/team/team-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Team Add",
        to: "/team/team-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Team Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Team Text",
    to: "/team-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Testimonial",
    route: "/testimonial",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Testimonial List",
        to: "/testimonial/testimonial-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Testimonial Add",
        to: "/testimonial/testimonial-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Testimonial Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Testimonial Text",
    to: "/testimonial-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Award",
    route: "/award",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Award List",
        to: "/award/award-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Award Add",
        to: "/award/award-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Award Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Award Text",
    to: "/award-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Blog",
    route: "/blog",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Blog List",
        to: "/blog/blog-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Blog Add",
        to: "/blog/blog-add",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Blog Edit",
        to: "",
        addLinkClass: "c-disabled",
        disabled: true,
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Blog Text",
    to: "/blog-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Base",
    route: "/base",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Breadcrumb",
        to: "/base/breadcrumbs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Cards",
        to: "/base/cards",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Carousel",
        to: "/base/carousels",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Collapse",
        to: "/base/collapses",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Forms",
        to: "/base/forms",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Jumbotron",
        to: "/base/jumbotrons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "List group",
        to: "/base/list-groups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Navs",
        to: "/base/navs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Navbars",
        to: "/base/navbars",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pagination",
        to: "/base/paginations",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Popovers",
        to: "/base/popovers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Progress",
        to: "/base/progress-bar",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Switches",
        to: "/base/switches",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tables",
        to: "/base/tables",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tabs",
        to: "/base/tabs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tooltips",
        to: "/base/tooltips",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Buttons",
    route: "/buttons",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Buttons",
        to: "/buttons/buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Brand buttons",
        to: "/buttons/brand-buttons",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Buttons groups",
        to: "/buttons/button-groups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dropdowns",
        to: "/buttons/button-dropdowns",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Charts",
    to: "/charts",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Icons",
    route: "/icons",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Free",
        to: "/icons/coreui-icons",
        badge: {
          color: "success",
          text: "NEW",
        },
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Flags",
        to: "/icons/flags",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CoreUI Brands",
        to: "/icons/brands",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Notifications",
    route: "/notifications",
    icon: "cil-bell",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Alerts",
        to: "/notifications/alerts",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Badges",
        to: "/notifications/badges",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Modal",
        to: "/notifications/modals",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Toaster",
        to: "/notifications/toaster",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Widgets",
    to: "/widgets",
    icon: "cil-calculator",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extras"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 404",
        to: "/404",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 500",
        to: "/500",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Disabled",
    icon: "cil-ban",
    badge: {
      color: "secondary",
      text: "NEW",
    },
    addLinkClass: "c-disabled",
    disabled: true,
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Labels"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label danger",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-danger",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label info",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-info",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Label warning",
    to: "",
    icon: {
      name: "cil-star",
      className: "text-warning",
    },
    label: true,
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
