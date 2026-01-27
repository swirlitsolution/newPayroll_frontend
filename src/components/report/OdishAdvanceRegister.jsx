import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
  const monthdata = {
    "01":"Jan",
    "02":"Feb",
    "03":"Mar",
    "04":"Apr",
    "05":"May",
    "06":"Jun",
    "07":"Jul",
    "08":"Aug",
    "09":"Sept",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec",
  }
function OdishAdvanceRegister(props) {
    console.log("Odisha Format Selected")
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
        {
      props.company && (
        <div className='w-full flex flex-col'>
            
            <button className=' mr-5 bg-black p-2 self-end w-24 text-white' onClick={reactToPrintFn}>Print</button>
            <div ref={contentRef}>
                <p className='text-center font-bold text-sm'>Annexure-B</p>
                <p className='text-center font-bold text-sm'>Form-XVI,XVII,XVIII & I</p>
                <p className='text-center font-bold text-sm'>Appendix-2 (b)</p>
                <p className='text-center font-bold text-sm'>COMBINED REGISTER OF FINES, DEDUCTIONS FOR DAMAGE OR LOSS AND ADVANCES</p>
                <p className='text-center font-bold text-sm'>[See rule 77 (2) (d),78(d)]</p>
                <p className='text-left text-sm mt-4'>Under Rule 21 (4) of Orissa Minimum Wages Rules, 1954</p>
                <p className='text-left text-sm'>Under Rule, 78 (d) (fine), 77 (22) (d) (dedu.), 77 (2) (d) (adv.) of Orissa Contract Labour (R & A) Rules, 1975</p>
                <p className='text-left text-sm'>Under Rule 3 (1) (fine), 4 (deductions) and 17 (3) (advances) of Orissa Payment of Wages Rules, 1936</p>
                <p className='text-left text-sm'>Under Rule 52 (2) C of Orissa I.S.M.W (RE & CS) Rules, 1980 <pre className='float-right'>Month     Year</pre></p>
                <p className='text-left text-sm'>Under Rule-239 (1) (b) of Orissa Building other Construction Workers (RE & CS) Rules, 2002<pre className='float-right'>{monthdata[props.month?.split("-")[1]]}     {props.month?.split("-")[0]}</pre></p>
                <p className='text-left text-sm'>Under Sec-18 Minimum Wages Act-1948</p>
                <div className='grid grid-col-3'>
                    <p className='text-left text-sm'>Name & Address of Contractor : {props.company?.name} </p>
                    <p className='text-left text-sm'>{props.company?.address}</p>
                </div>
            </div>
        </div>
      )
    }
    </div>
  )
}

export default OdishAdvanceRegister