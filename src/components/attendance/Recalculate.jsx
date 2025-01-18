import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import usePost from "../../hooks/usePost";
import { Controller, useForm } from "react-hook-form";
import Master from "../master/Master";

function Recalculate() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { data, error, loading, postRequest } = usePost("/recal/");

  const onSubmit = async (data) => {
    console.log("recal", data);
    if (data.attdate) {
      const res = await postRequest(data);

      if (res?.status === 200) {
        toast.success(res.data.success);
      }
    } else {
      toast.warning("Please select the month");
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto gap-2 mt-2">
      <div className="bg-white rounded-lg shadow p-2 border-2">
        <div className="flex justify-between items-center gap-2">
          <div className=" text-center">
            <h3 className="font-bold">Recalculate Payroll</h3>
          </div>
    
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 items-center justify-center"
          >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">All</label>

            <Input type="checkbox" id="all"  {...register("all")}  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
            <Controller
              name="Site"
              defaultValue="" // Initial value can be set here
              control={control}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value, ref } = field;
                return (
                  <Master
                    api="/master/site/"
                    onValueChange={(newValue) => {
                      onChange(newValue || null);
                    }}
                    value={value}
                    name="Site"
                  />
                );
              }}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Month{" "}
            </label>
            <Input type="month" {...register("attdate")} className="w-40" />

            <Button type="submit">Process</Button>
          </form>
        </div>
      </div>

      <div className="flex gap-2 w-full"></div>
    </div>
  );
}

export default Recalculate;
