import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { store } from '../utils';
import { useSnapshot } from 'valtio';

const ColorPicker = ({ color = '#2a2727', onChange, className = '' }) => {
  const [open, setOpen] = useState(false);
  const snap = useSnapshot(store);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className={`picker-wrapper ${className} flex flex-row justify-between items-center text-center my-2`}
      style={{ color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)' }}>
      <label htmlFor="color-tag">Colour Tag:</label>
      <div
        className="color-swatch"
        style={{ backgroundColor: color, borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)' }}
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div className="picker-popover">
          <ChromePicker
            color={color}
            onChangeComplete={c => onChange(c.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;