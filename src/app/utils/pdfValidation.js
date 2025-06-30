// utils/pdfValidation.js
export const validateFieldStatus = (value, pdfCoordinates) => {
  if (!value || value === '') {
    return 'default'; // No validation needed for empty values
  }
  
  const key = String(value).trim();
  
  // Check if key exists in pdf_coordinates
  if (!pdfCoordinates.hasOwnProperty(key)) {
    return 'error'; // Red - Key not present
  }
  
  const coordinates = pdfCoordinates[key];
  
  // Check if coordinates exist and are valid
  if (!coordinates || 
      (Array.isArray(coordinates) && coordinates.length === 0) ||
      (typeof coordinates === 'object' && Object.keys(coordinates).length === 0)) {
    return 'warning'; // Yellow - Key present but no coordinates
  }
  
  return 'success'; // Green - Key and coordinates present
};

export const getFieldValidationClass = (status, baseClass = '') => {
  const statusClasses = {
    'success': 'field-success', // Green
    'warning': 'field-warning', // Yellow
    'error': 'field-error',     // Red
    'default': ''               // No special styling
  };
  
  return `${baseClass} ${statusClasses[status] || ''}`.trim();
};

// Recursive function to extract all string values from nested objects/arrays
export const extractFieldValues = (obj, excludeKeys = ['pdf_coordinates']) => {
  const values = new Set();
  
  const traverse = (current, path = '') => {
    if (current === null || current === undefined) return;
    
    if (Array.isArray(current)) {
      current.forEach((item, index) => {
        traverse(item, `${path}[${index}]`);
      });
    } else if (typeof current === 'object') {
      Object.keys(current).forEach(key => {
        if (!excludeKeys.includes(key)) {
          traverse(current[key], path ? `${path}.${key}` : key);
        }
      });
    } else if (typeof current === 'string' && current.trim() !== '') {
      values.add(current.trim());
    }
  };
  
  traverse(obj);
  return Array.from(values);
};

// Hook for field validation
import { useMemo } from 'react';

export const useFieldValidation = (data, pdfCoordinates) => {
  return useMemo(() => {
    const fieldValues = extractFieldValues(data);
    const validationMap = new Map();
    
    fieldValues.forEach(value => {
      const status = validateFieldStatus(value, pdfCoordinates);
      validationMap.set(value, status);
    });
    
    return validationMap;
  }, [data, pdfCoordinates]);
};

// Component wrapper for validated inputs
import React from 'react';
import DGGIForm from '../components/Dggicompo/DGGIComponent';
import CaseAttributes from '../components/CaseAttributes/CaseAtrributes';
import OffenderIdentityForm from '../components/EntityDetails/entitydetails';

export const ValidatedInput = ({ 
  value, 
  pdfCoordinates, 
  className = '', 
  ...props 
}) => {
  const status = validateFieldStatus(value, pdfCoordinates);
  const validatedClass = getFieldValidationClass(status, className);
  
  return (
    <input
      {...props}
      value={value}
      className={validatedClass}
      data-validation-status={status}
    />
  );
};

// Enhanced ValidatedInput with tooltip
export const ValidatedInputWithTooltip = ({ 
  value, 
  pdfCoordinates, 
  className = '', 
  showTooltip = true,
  ...props 
}) => {
  const status = validateFieldStatus(value, pdfCoordinates);
  const validatedClass = getFieldValidationClass(status, className);
  
  const getTooltipMessage = (status) => {
    switch (status) {
      case 'success':
        return 'Field found in PDF with coordinates';
      case 'warning':
        return 'Field found in PDF but coordinates missing';
      case 'error':
        return 'Field not found in PDF';
      default:
        return '';
    }
  };
  
  return (
    <div className="validated-input-wrapper" style={{ position: 'relative' }}>
      <input
        {...props}
        value={value}
        className={validatedClass}
        data-validation-status={status}
        title={showTooltip ? getTooltipMessage(status) : ''}
      />
      {showTooltip && status !== 'default' && (
        <span className={`validation-indicator validation-indicator-${status}`}>
          {status === 'success' ? '✓' : status === 'warning' ? '⚠' : '✗'}
        </span>
      )}
    </div>
  );
};

// CSS styles to include in your SCSS file
export const validationStyles = `
.field-success {
  border-color: #10b981 !important;
  background-color: #f0fdf4;
}

.field-warning {
  border-color: #f59e0b !important;
  background-color: #fffbeb;
}

.field-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2;
}

.validated-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.validation-indicator {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  pointer-events: none;
}

.validation-indicator-success {
  color: #10b981;
}

.validation-indicator-warning {
  color: #f59e0b;
}

.validation-indicator-error {
  color: #ef4444;
}

/* Hover effects */
.field-success:hover {
  border-color: #059669;
}

.field-warning:hover {
  border-color: #d97706;
}

.field-error:hover {
  border-color: #dc2626;
}
`;
