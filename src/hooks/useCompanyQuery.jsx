import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCompany } from "../Redux/api/Company";

export const useCompanyQuery = () => {
    const { site } = useSelector(state => state.Site);
  const { data, isLoading, error } = useQuery({
    queryKey: ["company",site],
    queryFn: async () => {
      const res = await getCompany(site); // get selected company data
      return res.data;
    },           // ⬅ only fetch if redux is empty
    staleTime: 1000 * 60 * 5,         // never refetch automatically
  });
  const companyData = data
  return {companyData,isLoading,error}
};
