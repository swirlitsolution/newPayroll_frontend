import DataGrid from '../custom/DataGrid'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { companyList, updateCompany } from '../../Redux/api/Company'
const columns = [
    {field:'status',headerName:'Status',renderCell:(params)=>params.is_selected?"Selected":"Not Selected"},
    {field:'name',headerName:'Company Name',width:200},
    {field:'workNature',headerName:'Work Nature',width:200},
    {field:'contractEstablishment',headerName:'Contract Establishment',width:200},
    {field:'principleEmployer',headerName:'Principle Employer',width:200},
    
    {field:'address',headerName:'Address',width:300},
]
function SelectCompany() {
 
    const queryClient = useQueryClient();
    // get updated company list every time the component is mounted
    const { data, isPending } = useQuery({
        queryKey: ["companylist"],
        queryFn: async () => {
          const res = await companyList();
          return res.data;
        },           // ⬅ only fetch if redux is empty
        staleTime: 1000 * 60 * 1,         // never refetch automatically
      });
    // On selection of company get the updated selected company data
    const updateCompanyData = useMutation({
      mutationFn:(id)=>updateCompany(id),
      onSuccess: () => {
      // 👇 this is the magic
      toast.success("company selected")
      queryClient.invalidateQueries(["company"]);
    },
    })

    const handleRowClicked = async (params)=>{
        updateCompanyData.mutate(params.id)
    
    }

  return (
    <div className='flex flex-col gap-2 p-1'>
            {isPending?"Loading......": data?.length?(<DataGrid 
                heading=""
                columns={columns} 
                row={data} 
    
                rowClicked={handleRowClicked}
    
                />):(
                    <div>No data available</div>
                )}
        </div>
  )
}

export default SelectCompany