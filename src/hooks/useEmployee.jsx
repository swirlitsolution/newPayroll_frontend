import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../Redux/api/Employee";

export const useEmployee = () => {

  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  })
};
