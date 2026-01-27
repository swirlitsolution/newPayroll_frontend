import axios from "axios";

export const fetchEmployees = async () => {
  const response = await axios.get("master/employee/");
  return response.data;
};


