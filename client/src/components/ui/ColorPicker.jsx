import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChromePicker } from 'react-color';
import { store } from '../../utils';
import { useSnapshot } from 'valtio';

const ColorPicker = ({ name = 'color-tag', color = '#2a2727', onChange, className = '' }) => {
  const [open, setOpen] = useState(false);
  const snap = useSnapshot(store, { sync: true });
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, handleClickOutside]);

  const textStyle = useMemo(() => ({
    color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
  }), [snap.dark]);

  const swatchStyle = useMemo(() => ({
    backgroundColor: color,
    borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
  }), [color, snap.dark]);

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleColorChange = useCallback((colorObj) => {
    onChange(colorObj.hex);
  }, [onChange]);

  return (
    <div 
      ref={wrapperRef} 
      className={`picker-wrapper ${className} flex flex-row justify-between items-center text-center my-2`}
      style={textStyle}
    >
      <p>Colour Tag:</p>
      <div
        id={name}
        role="button"
        aria-label="Color picker"
        className="color-swatch"
        style={swatchStyle}
        onClick={toggleOpen}
      />
      {open && (
        <div className="picker-popover">
          <ChromePicker
            color={color}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ColorPicker);