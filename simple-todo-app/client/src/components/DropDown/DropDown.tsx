import React, { useLayoutEffect, useRef, useState } from 'react';
import './DropDown.scss';

export function DropDown(props: { userNameList: any[], updateUserShareName:
     (username: string) => void }) {
  const [open, setOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const dropDownRef = useRef<HTMLDivElement>(null);

  const dropDownClicked = () => {
    setOpen(!open);
  };

  const handleOptionClick = (username: string) => {
    setOpen(false);
    setCurrentOption(username);
    props.updateUserShareName(username);
  };

  const updateCurrentOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(event.target.value);
    props.updateUserShareName(event.target.value);
  };

  useLayoutEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropDownRef !== null
        && dropDownRef.current
        && !dropDownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div className="dropdown" ref={dropDownRef}>
      <div className="dropdown-text" onClick={dropDownClicked}>
        <input id="search-input" className="search-input" value={currentOption} onChange={(event) => updateCurrentOption(event)} />
        <span
          className="dropdown-caret"
        >
          <img src={require('../../resources/assets/caret-down-icon.png')} alt="dropdown-caret" width="8px" height="8px" />
        </span>
      </div>
      {open && (
      <div id="option-view" className="option-view">
        {props.userNameList.map((user) => <div id="option" onClick={() => handleOptionClick(user.username)} className="option">{user.username}</div>)}
      </div>
      )}
    </div>
  );
}
export default DropDown;
