import React from "react";
import cn from "classnames";
function TeamhubNav({ nav, selectedIndex, setIndex }) {
  return (
    <div>
      <ul>
        {nav.map((item, index) => (
          <li
            className={cn(index == selectedIndex && "active")}
            onClick={() => setIndex(index)}
            key={item + index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamhubNav;
