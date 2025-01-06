import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { addDays, format } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import usePost from '../../hooks/usePost';
import { Button } from '../ui/button';
import DataGrid from '../custom/DataGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCalendar from '../custom/CustomCalendar';
import useImportExport from '../../hooks/useImportExport';

const leaveCheckListcolumns = [
  { field: 'id', headerName: 'TrnId', width: '80px' },
  { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employee.EmpId },
  { field: 'Name', headerName: 'Name', renderCell: (params) => params.employee.Name },
  { field: 'sex', headerName: 'Sex', width: '90px', renderCell: (params) => params.employee.Gender },
  { field: 'Jan', headerName: 'Jan' },
  { field: 'Feb', headerName: 'Feb' },
  { field: 'Mar', headerName: 'Mar' },
  { field: 'Apr', headerName: 'Apr' },
  { field: 'May', headerName: 'May' },
  { field: 'Jun', headerName: 'Jun' },
  { field: 'Jul', headerName: 'Jul' },
  { field: 'Aug', headerName: 'Aug' },
  { field: 'Sept', headerName: 'Sept' },
  { field: 'Oct', headerName: 'Oct' },
  { field: 'Nov', headerName: 'Nov' },
  { field: 'Dec', headerName: 'Dec' },
  { field: 'total', headerName: 'Total Attn' },
  { field: 'el', headerName: 'EL' },
  { field: 'cl', headerName: 'CL' },
  { field: 'fl', headerName: 'FL' },
  { field: 'leave', headerName: 'Total' },
  { field: 'Remarks', headerName: 'Remarks', width: "100px" },
];

const leavebankcolumns = [
  { field: 'id', headerName: 'TrnId', width: '80px' },
  { field: 'Name', headerName: 'Name', renderCell: (params) => params.employee.Name },
  { field: 'ac', headerName: 'Bank A/C', renderCell: (params) => params.employee.Ac },
  { field: 'bank', headerName: 'Bank Name', renderCell: (params) => params.employee.Bank },
  { field: 'branch', headerName: 'Bank Branch', renderCell: (params) => params.employee.Branch },
  { field: 'net', headerName: 'Net Amount', renderCell: (params) => { const net = (params.rate.basic + params.rate.da) * params.leave; return net.toFixed(2) } },
];

const leavepaycolumns = [
  { field: 'id', headerName: 'TrnId', width: '80px' },
  { field: 'Name', headerName: 'Name', renderCell: (params) => params.employee.Name },
  { field: 'EmpId', headerName: 'EmpId', width: '80px', renderCell: (params) => params.employee.EmpId },
  { field: 'Designation', headerName: 'Designation', renderCell: (params) => params.employee.DesignationDetails.Name },
  { field: 'leave', headerName: 'Total' },
  { field: 'unit', headerName: 'Units Work Done' },
  { field: 'Basic', headerName: 'Basic', renderCell: (params) => params.rate.basic },
  { field: 'Da', headerName: 'Da', renderCell: (params) => params.rate.da },
  { field: 'overtime', headerName: 'Over Time' },
  { field: 'othercash', headerName: 'Earned Other cash Payment' },
  { field: 'Total', headerName: 'Total', renderCell: (params) => { const total = (params.rate.basic + params.rate.da) * params.leave; return total.toFixed(2) } },
  { field: 'Pf', headerName: 'PF' },
  { field: 'Esic', headerName: 'ESIC' },
  { field: 'Others', headerName: 'Others' },
  {
    field: 'net',
    headerName: 'Net Amount Paid',
    renderCell: (params) => {
      const netAmount = (params.rate.basic + params.rate.da) * params.leave;
      return netAmount.toFixed(2); // Ensures two decimal places
    }
  },
  { field: 'sig', headerName: 'Sig/Thumb Impression Work Man' },
  { field: 'Initial', headerName: 'Initial of Cont. or His Represent' },
  { field: 'cont', headerName: 'Signature of Cont. or his Represnt' },
];

function LeaveRegister() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { data, error, loading, postRequest } = usePost('/leave/');
  const { LeavePaySlip } = useImportExport("P");

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      dateRange: {
        from: format(new Date(data.dateRange.from), 'yyyy-MM-dd'),
        to: format(new Date(data.dateRange.to), 'yyyy-MM-dd'),
      },
    };

    postRequest(formattedData);
  };

  console.log("data of total ", data);
  console.log("data.leaveregister", data?.leaveregister);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="w-full border-2 flex gap-4 md:flex-row sm:flex-col sm:justify-start sm:items-start md:items-center sm:p-2 md:justify-center">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Date Range</label>
          <Controller
            name="dateRange"
            control={control}
            defaultValue={{
              from: new Date().toISOString().slice(0, 10),
              to: addDays(new Date(), 20).toISOString().slice(0, 10),
            }}
            render={({ field: { value, onChange } }) => (
              <CustomCalendar date={value} setDate={onChange} />
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div className="w-full mt-2">
        <Tabs defaultValue="leavechecklist" className="w-full">
          <TabsList className="flx gap-2">
            <TabsTrigger value="leavechecklist">Leave CheckList</TabsTrigger>
            <TabsTrigger value="leavepayregister">Leave Pay Register</TabsTrigger>
            <TabsTrigger value="leaveledger">Leave Ledger</TabsTrigger>
            <TabsTrigger value="leavepayslip">Leave Pay Slip</TabsTrigger>
            <TabsTrigger value="leavebankregister">Leave Bank Register</TabsTrigger>
          </TabsList>
          <TabsContent value="leavechecklist">
            {loading ? "Loading......" : data?.leaveregister?.length ? (
              <DataGrid
                heading="Leave Check List"
                columns={leaveCheckListcolumns}
                row={data?.leaveregister}
              />
            ) : (
              <div>No data available</div>
            )}
          </TabsContent>
          <TabsContent value="leavepayregister">
            {loading ? "Loading......" : data?.leaveregister?.length ? (
              <DataGrid
                heading="Leave Pay Register"
                columns={leavepaycolumns}
                row={data?.leaveregister}
              />
            ) : (
              <div>No data available</div>
            )}
          </TabsContent>
          <TabsContent value="leaveledger">
            {loading ? "Loading......" : data?.attendance?.length ? (
              <DataGrid
                heading="Leave Ledger"
                columns={leaveCheckListcolumns} // Example: Adjust columns if needed
                row={data?.attendance}
              />
            ) : (
              <div>No data available</div>
            )}
          </TabsContent>
          <TabsContent value="leavepayslip">
            {loading ? "Loading......" : data?.leaveregister?.length ? (
              <Button onClick={() => LeavePaySlip(data?.leaveregister)}>Download</Button>
            ) : (
              <div>No data available</div>
            )}
          </TabsContent>
          <TabsContent value="leavebankregister">
            {loading ? "Loading......" : data?.leaveregister?.length ? (
              <DataGrid
                heading="Leave Bank Register"
                columns={leavebankcolumns}
                row={data?.leaveregister}
              />
            ) : (
              <div>No data available</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LeaveRegister;
