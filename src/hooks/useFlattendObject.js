import React from 'react'

function useFlattendObject() {

    const flattenObject = (obj, parentKey = '') => {
        let result = {};
    
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}_${key}` : key;
    
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              // If the value is an object, recurse to flatten it
              Object.assign(result, flattenObject(obj[key], newKey));
            } else {
              // Otherwise, just assign the value
              result[newKey] = obj[key];
            }
          }
        }
    
        return result;
      };
  return {flattenObject}
}

export default useFlattendObject