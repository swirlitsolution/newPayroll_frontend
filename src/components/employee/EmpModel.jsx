import React, { useState } from 'react'
import EditEmpModel from './EditEmpModel';
import { useDispatch, useSelector } from 'react-redux';
import {setShow} from '../../Redux/Slices/EmpSlice'
import { X } from 'lucide-react';
import { Button } from '../ui/button';
function EmpModel() {
    const {show,SelectedEmployee} = useSelector(state=>state.Employee)
    const dispatch = useDispatch()
    
  return (
    <div> 
        
          {/* Modal */}
          {show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"  onClick={() => dispatch(setShow(false))}>
              <div className="bg-white p-6  shadow-xl w-[800px] h-full flex flex-col gap-2">
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold mb-1">Employee</h3>
                <Button
                  onClick={() => dispatch(setShow(false))}
                
                >
                  <X />
                </Button>
                </div>
                <hr />
                <div className='w-full h-full'>
                  <EditEmpModel emp={SelectedEmployee} heading="Employee" />
                </div>
                
    
                
              </div>
            </div>
          )}
        </div>
  )
}

export default EmpModel