import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
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
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Award Text",
    to: "/award-text",
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
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Blog Text",
    to: "/blog-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Company Details",
    to: "/company-detail",
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
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Portfolio Text",
    to: "/portfolio-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Privacy Policy",
    to: "/privacy-policy",
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
        name: "Service Subcategory List",
        to: "/service/service-subcategory-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Service Subcategory Add",
        to: "/service/service-subcategory-add",
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
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Testimonial Text",
    to: "/testimonial-text",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Terms & Conditions",
    to: "/terms-and-condition",
    icon: "cil-chart-pie",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
