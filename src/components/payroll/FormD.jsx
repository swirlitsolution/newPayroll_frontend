import React, { useState } from 'react'
import { Button } from '../ui/button'
import FormDReport from './FormDReport';
import NewWindowPortal from '../report/NewWindowPortal';

function FormD(props) {
     const [showPreview, setShowPreview] = useState(false);
  return (
    <div>
        <Button onClick={() => setShowPreview(true)}>FormD</Button>
        {showPreview && (
            <NewWindowPortal closeWindowPortal={() => setShowPreview(false)}>
                    <FormDReport company={props?.company} employee={props?.employee} month={props?.month} site={props?.site} wait={props?.wait} />
            </NewWindowPortal>
            
        )}
    </div>
  )
}

export default FormD