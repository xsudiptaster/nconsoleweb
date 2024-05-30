import React, { useId } from 'react';
import './CustomCheckBox.css';
interface ICustomCheckBoxProps {
  children?: React.ReactNode;
  checked?: any;
  disabled?: boolean;
  onChange?: any;
  style?: any;
}

const CustomCheckBox: React.FC<ICustomCheckBoxProps> = (props) => {
  const { checked, onChange, style, children, disabled } = props;
  const id = useId();
  return (
    <div className="checkbox-wrapper-52">
      <label htmlFor={id} className="item" style={style}>
        <input type="checkbox" id={id} className="hidden" checked={checked} onChange={onChange} disabled={disabled} />
        <label htmlFor={id} className="cbx">
          <svg width="14px" height="12px" viewBox="0 0 14 12">
            <polyline points="1 7.6 5 11 13 1"></polyline>
          </svg>
        </label>
        <label htmlFor={id} className="cbx-lbl">
          {children}
        </label>
      </label>
    </div>
  );
};

export default CustomCheckBox;
