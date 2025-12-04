import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook';
import SelectCompany from './SelectCompany';

function ShortCutModal() {
    const [open, setOpen] = useState(false);
     // Show modal on shortcut: CTRL + K
  useHotkeys(
    'ctrl+l',
    (event) => {
      event.preventDefault();   // ⛔ Stop browser search bar
      setOpen(true);
    },
    {
      filterPreventDefault: true,
      preventDefault: true,
      enableOnFormTags: true,
    }
  );
  // Close modal on ESC
  useHotkeys("esc", () => setOpen(false));
  return (
    <>
    
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50">
          <div className="bg-white p-6  shadow-xl w-[500px] h-full flex flex-col gap-2">
            <h3 className="text-lg font-bold mb-1">Companies</h3>
            <hr />
            <div className='w-full h-full'>
              <SelectCompany />
            </div>
            

            <button
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close (ESC)
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ShortCutModal