const express = require("express");
const authRoute = require("./authRoute");
const salaryRoute = require("./salaryRoute")
const budgetRoute = require("./budgetRoute")
const expensesRoute = require("./expenseRoute")
const categoryRoute = require("./categoryRoute")
const defaultBudgetRoute = require('./defaultBudgetRoutes')
const dashboardRoute = require('./dashboard')
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/salary",
    route: salaryRoute,
  },
  {
    path: "/budget",
    route: budgetRoute,
  },
  {
    path: "/expenses",
    route: expensesRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/defaultBudget",
    route: defaultBudgetRoute
  },
  {
    path: "/dashboard",
    route: dashboardRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;