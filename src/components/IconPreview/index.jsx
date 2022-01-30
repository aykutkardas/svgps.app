import classNames from 'classnames';
import { useState } from 'react';

export default function IconPreview({ icon, icons, setIcons }) {
  const [isSelected, setIsSelected] = useState(false);

  const prevName = icon.name;

  const handleChangeName = (e) => {
    const newIcons = icons.map((icon) => {
      if (icon.name === prevName) {
        icon.name = e.target.value;
      }

      return icon;
    });
    setIcons(newIcons);
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        className={classNames("flex items-center justify-center w-32 h-32 border rounded-sm", {
          'border-neutral-200 hover:bg-neutral-100': !isSelected,
          'border-2 border-green-500 outline-2 outline-double outline-green-500/25': isSelected
        })}
        onClick={() => setIsSelected((selected) => !selected)}
      >
        <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: icon.content }} />
      </button>
      <input
        className="block w-3/4 p-0 px-1 mx-auto mt-2 text-xs text-center border-dashed border-slate-400 focus:border-transparent"
        type="text"
        onChange={handleChangeName}
        value={icon.name}
      />
    </div>
  );
}
