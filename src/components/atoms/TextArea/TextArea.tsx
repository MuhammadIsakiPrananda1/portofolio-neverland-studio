import { type TextAreaProps } from '@/types';
import { forwardRef, useState } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, maxLength, showCharCount = false, className = '', ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/5 backdrop-blur-sm
            border-2 ${error ? 'border-red-500' : 'border-white/10'}
            text-white placeholder-gray-500
            focus:outline-none focus:border-primary
            transition-all duration-300
            ${error ? 'focus:ring-2 focus:ring-red-500/20' : 'focus:ring-2 focus:ring-primary/20'}
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-vertical min-h-[120px]
            ${className}
          `}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        <div className="flex justify-between items-center mt-1.5">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-400">{helperText}</p>
            )}
          </div>
          {showCharCount && maxLength && (
            <p className={`text-sm ${charCount > maxLength * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
