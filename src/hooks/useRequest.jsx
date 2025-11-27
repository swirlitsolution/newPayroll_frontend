import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
const useRequest = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()
    const token = cookies.get('access')
    const getRequest = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            // Attach the cancel token
          });
  
          setData(response.data); // Axios automatically parses the response as JSON
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log('Fetch aborted');
          } else {
            setError(err); // Set the error state for other errors
          }
        } finally {
          setLoading(false);
        }
      };
      const getNextRequest = async (apiurl) => {
        setLoading(true)
        try {
          const response = await axios.get(apiurl, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            // Attach the cancel token
          });
  
          setData(response.data); // Axios automatically parses the response as JSON
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log('Fetch aborted');
          } else {
            setError(err); // Set the error state for other errors
          }
        } finally {
          setLoading(false);
        }
      };
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
          if(response.status === 226){
            toast.warning(response.data.exists)
          }
          if(response.status===201){
            toast.success(response.data.success)
          }
          if(response.status===200){
            console.log(response.data)

          setData(response.data);
          toast.success("Saved Successfully")
          }
        } catch (err) {
          console.error(err)
          if(err.response.status === 400){
            const error = err.response.data
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
      const onlypostRequest = async (api,payload) => {
        setLoading(true);
        setError(null);
        console.log("data to save",payload)
        try {
          const response = await axios.post(api, payload,
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
            setData(response.data);
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
      const onlypatchRequest = async (api,payload) => {
        console.log("data to update",payload,api)
        setLoading(true);
        setError(null);
        try {
          const response = await axios.patch(api, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          console.log("updated",response)
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
          }
        } catch (err) {
          console.error(err)
          if(err.status === 400){
            const error = err.response.data
            Object.entries(error).map(([key, value]) => (toast.warning(`${key}  ${value}`)))
          }
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const patchRequest = async (payload) => {
        console.log("data to update",payload,url)
        setLoading(true);
        setError(null);
        try {
          const response = await axios.patch(url, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
          }
        } catch (err) {
          console.error(err)
          if(err.status === 400){
            const error = err.response.data
            Object.entries(error).map(([key, value]) => (toast.warning(`${key}  ${value}`)))
          }
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const onlyputRequest = async (api,payload) => {
        console.log("data to update",payload,url)
        setLoading(true);
        setError(null);
        try {
          const response = await axios.put(api, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
          }
        } catch (err) {
          console.error(err)
          if(err.status === 400){
            const error = err.response.data
            Object.entries(error).map(([key, value]) => (toast.warning(`${key}  ${value}`)))
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
        console.log("data to update",payload,url)
        setLoading(true);
        setError(null);
        try {
          const response = await axios.put(url, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
          setData(response.data);
          toast.success("Update Successfully")
          }
        } catch (err) {
          console.error(err)
          if(err.status === 400){
            const error = err.response.data
            Object.entries(error).map(([key, value]) => (toast.warning(`${key}  ${value}`)))
          }
            if(err.status===409){
                toast.warning(err.response.data.warning)
              }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      const deleteRequest = async (payload) => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.delete(url + payload.id + "/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            }
          );
          if(response.status===200){
          setData(response.data);
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('access');
        console.log("emloyee token",token)
       // const source = axios.CancelToken.source(); // Create a cancel token

        const fetchData = async () => {
 
          try {
            const response = await axios.get(url, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              // Attach the cancel token
            });
            console.log(response.data)
            setData(response.data); // Axios automatically parses the response as JSON
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log('Fetch aborted');
            } else {
              setError(err); // Set the error state for other errors
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
        const source = axios.CancelToken.source();
    console.log(data,loading,error)
      return ()=>{
        source.cancel()
      }
      }, [url]);


 
return { data, error, loading, getRequest,getNextRequest,postRequest,onlypostRequest,putRequest,onlyputRequest,patchRequest,onlypatchRequest,deleteRequest }
}
export default useRequest;