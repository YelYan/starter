import React from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoResize from "react-virtualized-auto-sizer";

interface VitrualizeProps<T> {
  data: T[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
  columnCount?: number;
  rowHeight?: number;
  gridGap?: number;
}

const Virtualize = <T,>({
  data,
  renderItem,
  columnCount = 4,
  rowHeight = 400,
  gridGap = 16,
}: VitrualizeProps<T>) => {
  return (
    <AutoResize>
      {({ height, width }) => {
        // Calculate the width of each column
        const columnWidth = (width - (columnCount - 1) * gridGap) / columnCount;

        // Calculate the number of rows
        const rowCount = Math.ceil(data.length / columnCount);

        return (
          <Grid
            className="no-scrollbar"
            columnCount={columnCount}
            rowCount={rowCount}
            columnWidth={columnWidth}
            rowHeight={rowHeight + gridGap} // Include grid gap in row height
            height={height}
            width={width}
          >
            {({ columnIndex, rowIndex, style }) => {
              // Calculate the index of the current item
              const index = rowIndex * columnCount + columnIndex;
              const item = data[index];

              // Add grid gap to the style
              const itemStyle: React.CSSProperties = {
                ...style,
                width: `${columnWidth - gridGap}px`, // Adjust width to account for grid gap
                height: `${rowHeight}px`, // Use dynamic row height
                left: `${
                  parseFloat(style.left as string) + columnIndex * gridGap
                }px`, // Adjust left position for grid gap
                top: `${
                  parseFloat(style.top as string) + rowIndex * gridGap
                }px`, // Adjust top position for grid gap
              };

              // Render the item if it exists
              return item ? renderItem(item, itemStyle) : null;
            }}
          </Grid>
        );
      }}
    </AutoResize>
  );
};

export default Virtualize;
