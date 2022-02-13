import React from 'react'

const Toggle = ({ checked, onChange }: any) => (
  <span className="toggle-control">
    <input
      className="darkmodeToggler"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="darkmodeToggler"
    />
    <label htmlFor="darkmodeToggler" />
  </span>
)

export default Toggle
