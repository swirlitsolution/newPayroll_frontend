import axios from "axios";
import { toast } from "react-toastify";

export const getCompany = async () => {
        try {
          const response = await axios.get("api/select/company/");
    
          if(response.status === 404){
            toast.warning("Requested source not found !")
          }
          if(response.status === 226){
            toast.warning(response.data.exists)
          }
          if(response.status===201){
            toast.success(response.data.success)
          }
          if(response.status===200){
            
            return response
         
          }
          return response
        } catch (err) {
          console.error(err)
          if(err.response.status === 404){
            var error = err.response.data
            Object.keys(error).map((key)=>{
              toast.warning(`${key} ${error[key]}`)
            })
          }
          if(err.response.status === 400){
            error = err.response.data
            Object.keys(error).map((key)=>{
              toast.warning(`${key} ${error[key]}`)
            })
           } 
           
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
         
        } 
      };

export const updateCompany = async (id)=>{
    const response = await axios.put(`api/update/company/details/${id}/`, {},);
    return response
}

export const companyList = async ()=>{
    const response = await axios.get('api/company/details/list/');
    return response

}