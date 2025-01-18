import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';


function usePost(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()
    const token = cookies.get('access')
    const postRequest = async (payload) => {
        setLoading(true);
        setError(null);
        console.log("data to save",payload)
        try {
          const response = await axios.post(url, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: false
            }
          );
          console.log("post response",response)
          if(response.status === 201){
            toast.success(response.data.success)
            setData(response.data);
          }
          if(response.status === 202){
            toast.success(response.data.success)
            setData(response.data);
          }
          if(response.status === 204){
            toast.warning(`Nothing found ${payload?.attendance?.Aadhar?payload.attendance?.Aadhar:''}`)
          }
          if(response.status === 226){
            toast.warning(response.data.exists)
          }
          
          if(response.status===200){
            console.log(response.data)
            toast.success("Processed Successfully")
          setData(response.data);
      
          
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
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const putRequest = async (payload) => {
        setLoading(true);
        setError(null);
        console.log("data to save",payload)
        try {
          const response = await axios.put(url, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: false
            }
          );
          console.log("post response",response)
          if(response.status === 201){
            toast.success(response.data.success)
          }
          if(response.status === 202){
            toast.success(response.data.success)
          }
          if(response.status === 226){
            toast.warning(response.data.exists)
          }
          if(response.status===200){
            console.log(response.data)

          setData(response.data);
      
          return response
          }
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
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const putapiRequest = async (api,payload) => {
        setLoading(true);
        setError(null);
        console.log("data to save",payload)
        try {
          const response = await axios.put(api, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: false
            }
          );
          console.log("post response",response)
          if(response.status === 201){
            toast.success(response.data.success)
          }
          if(response.status === 202){
            toast.success(response.data.success)
          }
          if(response.status === 226){
            toast.warning(response.data.exists)
          }
          if(response.status===200){
            console.log(response.data)

          setData(response.data);
      
          return response
          }
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
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const getRequest = async (api) => {
        setLoading(true);
        setError(null);
     
        try {
          const response = await axios.get(api,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: false
            }
          );
          console.log("get response",response)
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
            console.log(response.data)

          setData(response.data);
      
         
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
            var error = err.response.data
            Object.keys(error).map((key)=>{
              toast.warning(`${key} ${error[key]}`)
            })
           } 
           
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      return { data, error, loading,getRequest,postRequest,putRequest,putapiRequest }
}

export default usePost