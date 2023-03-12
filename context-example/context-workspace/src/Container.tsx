import React from "react";

// ======================================================================================
// 👮  ⛔️  sowas wie in dieser Datei bitte NIE in einer richtigen Anwendung machen ⛔️   👮
// ======================================================================================

type ContainerProps = {
  children: React.ReactNode;
  title: string;
  color?: string;
};

/*Auf true stellen, dann wird die Anzahl der Renderings angezeigt
 */
const showRenderings = false;

const renderMap: Record<string, number> = {};

export default function Container({ children, title, color = "black" }: ContainerProps) {
  let renderCount = (renderMap[title] || 0) + 1;
  renderMap[title] = renderCount;

  console.log(`Render '${title}'`, renderCount);

  if (!showRenderings) {
    return <div>{children}</div>;
  }

  const style: React.CSSProperties = {
    padding: "0.5rem",
    margin: "0.5rem",
    border: `1px solid ${color}`
  };

  return (
    <div style={style}>
      <div>
        <b>
          {title} (Renderings: {renderCount})
        </b>
        {children}
      </div>
    </div>
  );
}
