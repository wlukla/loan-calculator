import React from 'react';
import PropTypes from 'prop-types';
import tabSwitcherProps from './types';

const TabSwitcher = (props: tabSwitcherProps) => {
  const buttons = [
    { name: 'loan', label: 'Loan' },
    { name: 'lease', label: 'Lease' },
  ];

  const renderedButtons = buttons.map(({ name, label }) => {
    const { currentTab, onTabClick } = props;

    const btnStyles = name === currentTab
      ? 'btn btn-primary'
      : 'btn btn-secondary';

    return (
      <button
        className={btnStyles}
        onClick={() => onTabClick(name)}
        type="button"
        key={label}
        tabIndex={0}
      >
        {label}
      </button>
    );
  });

  return (
    <div className="btn-group mb-1">
      {renderedButtons}
    </div>
  );
};

TabSwitcher.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default TabSwitcher;
