export const dashboardRoutes = {
  INTERNAL: "/internal/dashboard",
  STAFF: "/staff/dashboard",
  PATIENT: "/patient/dashboard",
};

export enum userStatus {
  Active = "Active",
  Inactive = "Inactive",
}

const STATUS_ACTIVE = { id: 1, name: "Active", color: "blue.300" };
const STATUS_INACTIVE = {
  id: 2,
  name: "Inactive",
  color: "yellow.400",
};
export const STATUSES = [STATUS_ACTIVE, STATUS_INACTIVE];

export const icons = ["pie-chart", "login-arrow"];
