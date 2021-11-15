import React from "react";

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

// Our Component--------------------------------------------------------------------------------------
const Banner = React.lazy(() => import("./views/banner/Banner"));

const AboutUs = React.lazy(() => import("./views/aboutUs/AboutUs"));

const CompanyDetail = React.lazy(() =>
  import("./views/companyDetail/CompanyDetail")
);

const PrivacyPolicy = React.lazy(() =>
  import("./views/privacyPolicy/PrivacyPolicy")
);

const TermsAndCondition = React.lazy(() =>
  import("./views/termsAndCondition/TermsAndCondition")
);

const FaqList = React.lazy(() => import("./views/faq/faq-list/FaqList"));
const FaqAdd = React.lazy(() => import("./views/faq/faq-add/FaqAdd"));
const FaqEdit = React.lazy(() => import("./views/faq/faq-edit/FaqEdit"));
const FaqText = React.lazy(() => import("./views/faqText/FaqText"));

const ServiceCategoryList = React.lazy(() =>
  import("./views/serviceCategory/service-category-list/ServiceCategoryList")
);
const ServiceCategoryAdd = React.lazy(() =>
  import("./views/serviceCategory/service-category-add/ServiceCategoryAdd")
);
const ServiceCategoryEdit = React.lazy(() =>
  import("./views/serviceCategory/service-category-edit/ServiceCategoryEdit")
);
const ServiceSubcategoryList = React.lazy(() =>
  import(
    "./views/serviceSubcategory/service-subcategory-list/ServiceSubcategoryList"
  )
);
const ServiceSubcategoryAdd = React.lazy(() =>
  import(
    "./views/serviceSubcategory/service-subcategory-add/ServiceSubcategoryAdd"
  )
);
const ServiceSubcategoryEdit = React.lazy(() =>
  import(
    "./views/serviceSubcategory/service-subcategory-edit/ServiceSubcategoryEdit"
  )
);
const ServiceText = React.lazy(() => import("./views/serviceText/ServiceText"));

const PortfolioList = React.lazy(() =>
  import("./views/portfolio/portfolio-list/PortfolioList")
);
const PortfolioAdd = React.lazy(() =>
  import("./views/portfolio/portfolio-add/PortfolioAdd")
);
const PortfolioEdit = React.lazy(() =>
  import("./views/portfolio/portfolio-edit/PortfolioEdit")
);
const PortfolioText = React.lazy(() =>
  import("./views/portfolioText/PortfolioText")
);

const TeamList = React.lazy(() => import("./views/team/team-list/TeamList"));
const TeamAdd = React.lazy(() => import("./views/team/team-add/TeamAdd"));
const TeamEdit = React.lazy(() => import("./views/team/team-edit/TeamEdit"));
const TeamText = React.lazy(() => import("./views/teamText/TeamText"));

const TestimonialList = React.lazy(() =>
  import("./views/testimonial/testimonial-list/TestimonialList")
);
const TestimonialAdd = React.lazy(() =>
  import("./views/testimonial/testimonial-add/TestimonialAdd")
);
const TestimonialEdit = React.lazy(() =>
  import("./views/testimonial/testimonial-edit/TestimonialEdit")
);
const TestimonialText = React.lazy(() =>
  import("./views/testimonialText/TestimonialText")
);

const AwardList = React.lazy(() =>
  import("./views/award-list/AwardList.jsx")
);
const AwardAdd = React.lazy(() => import("./views/award-add/AwardAdd.jsx"));
const AwardEdit = React.lazy(() =>
  import("./views/award-edit/AwardEdit")
);
const AwardText = React.lazy(() => import("./views/awardText/AwardText"));

const BlogList = React.lazy(() => import("./views/blog/blog-list/BlogList"));
const BlogAdd = React.lazy(() => import("./views/blog/blog-add/BlogAdd"));
const BlogEdit = React.lazy(() => import("./views/blog/blog-edit/BlogEdit"));
const BlogText = React.lazy(() => import("./views/blogText/BlogText"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  // Our Component------------------------------------------------------------------------------
  { path: "/banner", name: "Banner", component: Banner },

  { path: "/about-us", name: "About Us", component: AboutUs },

  { path: "/company-detail", name: "Company Detail", component: CompanyDetail },

  { path: "/privacy-policy", name: "Privacy Policy", component: PrivacyPolicy },

  {
    path: "/terms-and-condition",
    name: "Terms And Conditions",
    component: TermsAndCondition,
  },

  { path: "/faq", name: "FAQ", component: FaqList, exact: true },
  { path: "/faq/faq-list", name: "Faq List", component: FaqList },
  { path: "/faq/faq-add", name: "Faq Add", component: FaqAdd },
  {
    path: "/faq/faq-edit/:id",
    name: "FAQ Edit",
    component: FaqEdit,
  },
  { path: "/faq-text", name: "FAQ Text", component: FaqText },

  {
    path: "/service",
    name: "Service Category",
    component: ServiceCategoryList,
    exact: true,
  },
  {
    path: "/service/service-category-list",
    name: "Service Category List",
    component: ServiceCategoryList,
  },
  {
    path: "/service/service-category-add",
    name: "Service Category Add",
    component: ServiceCategoryAdd,
  },
  {
    path: "/service/service-category-edit/:id",
    name: "Service Category Edit",
    component: ServiceCategoryEdit,
  },
  {
    path: "/service/service-subcategory-list",
    name: "Service Subcategory List",
    component: ServiceSubcategoryList,
  },
  {
    path: "/service/service-subcategory-add",
    name: "Service Subcategory Add",
    component: ServiceSubcategoryAdd,
  },
  {
    path: "/service/service-subcategory-edit/:id",
    name: "Service Subcategory Edit",
    component: ServiceSubcategoryEdit,
  },
  { path: "/service-text", name: "Service Text", component: ServiceText },

  {
    path: "/portfolio",
    name: "Portfolio",
    component: PortfolioList,
    exact: true,
  },
  {
    path: "/portfolio/portfolio-list",
    name: "Portfolio List",
    component: PortfolioList,
  },
  {
    path: "/portfolio/portfolio-add",
    name: "Portfolio Add",
    component: PortfolioAdd,
  },
  {
    path: "/portfolio/portfolio-edit/:id",
    name: "Portfolio Edit",
    component: PortfolioEdit,
  },
  { path: "/portfolio-text", name: "Portfolio Text", component: PortfolioText },

  {
    path: "/team",
    name: "Team",
    component: TeamList,
    exact: true,
  },
  {
    path: "/team/team-list",
    name: "Team List",
    component: TeamList,
  },
  {
    path: "/team/team-add",
    name: "Team Add",
    component: TeamAdd,
  },
  {
    path: "/team/team-edit/:id",
    name: "Team Edit",
    component: TeamEdit,
  },
  { path: "/team-text", name: "Team Text", component: TeamText },

  {
    path: "/testimonial",
    name: "Testimonial",
    component: TestimonialList,
    exact: true,
  },
  {
    path: "/testimonial/testimonial-list",
    name: "Testimonial List",
    component: TestimonialList,
  },
  {
    path: "/testimonial/testimonial-add",
    name: "Testimonial Add",
    component: TestimonialAdd,
  },
  {
    path: "/testimonial/testimonial-edit/:id",
    name: "Testimonial Edit",
    component: TestimonialEdit,
  },
  {
    path: "/testimonial-text",
    name: "Testimonial Text",
    component: TestimonialText,
  },

  {
    path: "/award",
    name: "Award",
    component: AwardList,
    exact: true,
  },
  {
    path: "/award/award-list",
    name: "Award List",
    component: AwardList,
  },
  {
    path: "/award/award-add",
    name: "Award Add",
    component: AwardAdd,
  },
  {
    path: "/award/award-edit/:id",
    name: "Award Edit",
    component: AwardEdit,
  },
  { path: "/award-text", name: "Award Text", component: AwardText },

  {
    path: "/blog",
    name: "Blog",
    component: BlogList,
    exact: true,
  },
  {
    path: "/blog/blog-list",
    name: "Blog List",
    component: BlogList,
  },
  {
    path: "/blog/blog-add",
    name: "Blog Add",
    component: BlogAdd,
  },
  {
    path: "/blog/blog-edit/:id",
    name: "Blog Edit",
    component: BlogEdit,
  },
  { path: "/blog-text", name: "Blog Text", component: BlogText },
];

export default routes;
