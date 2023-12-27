import React, {useContext} from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css';

function ToggleSwitch() {
  const {handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext);
  return (
    <>
      <input
        className="toggle-switch__checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <label
        className="toggle-switch__label"
        htmlFor={`react-switch-new`}
      >
        <span className={`toggle-switch__button`} />
        <div className="toggle-switch__text">F</div>
        <div className="toggle-switch__text">C</div>
      </label>
    </>
  );
};

export default ToggleSwitch;