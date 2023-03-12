import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  title: string;
  color?: string;
};

const renderMap: Record<string, number> = {};

export default function Container({ children, title, color = "black" }: ContainerProps) {
  let renderCount = (renderMap[title] || 0) + 1;
  renderMap[title] = renderCount;

  console.log(`Render '${title}'`, renderCount);

  const style: React.CSSProperties = {
    padding: "0.5rem",
    margin: "0.5rem",
    border: `1px solid ${color}`
  };

  return (
    <div style={style}>
      <div>
        <b>{title}</b>
      </div>
      {children}
    </div>
  );
}
