/** 
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
  10. The `private` key is used to check its a private route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Creators from "layouts/creators";
import Users from "layouts/users";
import Billing from "layouts/billing";

// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import UsersIcon from "examples/Icons/Users";
import Document from "examples/Icons/Document";
import CreditCard from "examples/Icons/CreditCard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    isPrivate: true,
    isOnLeftMenu: true
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <UsersIcon size="12px" />,
    component: <Users />,
    noCollapse: true,
    isPrivate: true,
    isOnLeftMenu: true
  },
  {
    type: "collapse",
    name: "Creators",
    key: "creators",
    route: "/creators",
    icon: <Office size="12px" />,
    component: <Creators />,
    noCollapse: true,
    isPrivate: true,
    isOnLeftMenu: true
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
    isPrivate: true,
    isOnLeftMenu: true
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
    isPrivate: false,
    isOnLeftMenu: false
  },
];

export default routes;
