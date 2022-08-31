import { useState, createContext } from "react";

interface IDragDropContext {
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
}

const DragDropContext = createContext<IDragDropContext>({
  isDragging: false,
  setIsDragging: () => {},
});

const DragDropProvider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DragDropContext.Provider value={{ isDragging, setIsDragging }}>
      {children}
    </DragDropContext.Provider>
  );
};

export { DragDropContext, DragDropProvider };
