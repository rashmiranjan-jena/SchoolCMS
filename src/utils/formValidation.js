import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function validateForm(fields, rules) {
    console.log({fields, rules});
    
    let isValid = true;

    const validateField = (value, fieldRules, fieldName) => {
        const rulesList = Array.isArray(fieldRules) ? fieldRules : [fieldRules];

        for (const rule of rulesList) {
            if (rule.type === 'required' && (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'string' && value.trim() === ''))) {
                toast.error(rule.message || `${fieldName} is required.`);
                return false;
            }
            if (rule.type === 'minLength' && value.length < rule.value) {
                toast.error(rule.message || `${fieldName} must be at least ${rule.value} characters.`);
                return false;
            }
            if (rule.type === 'maxLength' && value.length > rule.value) {
                toast.error(rule.message || `${fieldName} must not exceed ${rule.value} characters.`);
                return false;
            }
            if (rule.type === 'pattern' && !rule.value.test(value)) {
                toast.error(rule.message || `${fieldName} is invalid.`);
                return false;
            }
            if (rule.type === 'file') {
                if (Array.isArray(value)) {
                    for (const file of value) {
                        if (rule.maxSize && file.size > rule.maxSize) {
                            toast.error(rule.message || `${fieldName} size must be less than ${rule.maxSize / 1024 / 1024} MB.`);
                            return false;
                        }
                        if (rule.accept && !rule.accept.includes(file.type)) {
                            toast.error(rule.message || `${fieldName} type must be one of the following: ${rule.accept.join(', ')}.`);
                            return false;
                        }
                    }
                } else {
                    if (rule.maxSize && value.size > rule.maxSize) {
                        toast.error(rule.message || `${fieldName} size must be less than ${rule.maxSize / 1024 / 1024} MB.`);
                        return false;
                    }
                    if (rule.accept && !rule.accept.includes(value.type)) {
                        toast.error(rule.message || `${fieldName} type must be one of the following: ${rule.accept.join(', ')}.`);
                        return false;
                    }
                }
            }
            if (rule.type === 'custom' && typeof rule.validate === 'function') {
                const customError = rule.validate(value);
                if (customError) {
                    toast.error(customError);
                    return false;
                }
            }
        }
        return true;
    };

    const validateObject = (obj, objRules, parentPath = '') => {
        for (const field in objRules) {
            const fieldValue = parentPath ? obj[parentPath]?.[field] : obj[field];
            const fieldRules = objRules[field];

            if (typeof fieldRules === 'object' && !Array.isArray(fieldRules)) {
                if (!validateObject(obj, fieldRules, field)) {
                    isValid = false;
                }
            } else {
                if (!validateField(fieldValue, fieldRules, field)) {
                    isValid = false;
                }
            }
        }
        return isValid;
    };

    validateObject(fields, rules);

    return isValid;
}
