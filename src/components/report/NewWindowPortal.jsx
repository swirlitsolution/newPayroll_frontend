import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const NewWindowPortal = ({ children, closeWindowPortal }) => {
  const [containerEl] = useState(document.createElement('div'));
  let externalWindow = null;

  useEffect(() => {
    // 1. Nayi window open karein
    externalWindow = window.open('', '', 'width=800,height=600,left=200,top=200');
    containerEl.classList.add('w-full', 'h-full');
    // 2. Parent window ke styles naye window mein copy karein (Zaruri hai Design ke liye)
    const copyStyles = (sourceDoc, targetDoc) => {
      Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet.cssRules) {
          const newStyleEl = sourceDoc.createElement('style');
          Array.from(styleSheet.cssRules).forEach(rule => {
            newStyleEl.appendChild(sourceDoc.createTextNode(rule.cssText));
          });
          targetDoc.head.appendChild(newStyleEl);
        }
      });
    };
    copyStyles(document, externalWindow.document);

    // 3. Container ko naye window mein add karein
    externalWindow.document.body.appendChild(containerEl);
    
    // Window close hone par cleanup
    externalWindow.addEventListener('beforeunload', closeWindowPortal);

    return () => {
      externalWindow.close();
    };
  }, []);

  return createPortal(children, containerEl);
};

export default NewWindowPortal;