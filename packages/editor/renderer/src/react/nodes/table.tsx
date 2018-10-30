import * as React from 'react';
import {
  calcTableWidth,
  WidthConsumer,
  TableSharedCssClassName,
} from '@atlaskit/editor-common';

const isHeaderRowEnabled = rows => {
  if (!rows.length) {
    return false;
  }
  const { children } = rows[0].props;
  for (let i = 0, len = children.length; i < len; i++) {
    if (children[i].type.name === 'TableCell') {
      return false;
    }
  }
  return true;
};

const addNumberColumnIndexes = rows => {
  const headerRowEnabled = isHeaderRowEnabled(rows);
  return React.Children.map(rows, (row, index) => {
    return React.cloneElement(React.Children.only(row), {
      isNumberColumnEnabled: true,
      index: headerRowEnabled ? (index === 0 ? '' : index) : index + 1,
    });
  });
};

const Table = props => {
  const colgroup = props.columnWidths ? (
    <colgroup>
      {props.columnWidths.map((colWidth, idx) => {
        const style = colWidth ? { width: `${colWidth}px` } : {};
        return <col key={idx} style={style} />;
      })}
    </colgroup>
  ) : null;

  return (
    <WidthConsumer>
      {({ width }) => (
        <div
          className={TableSharedCssClassName.TABLE_CONTAINER}
          data-layout={props.layout}
          style={{ width: calcTableWidth(props.layout, width, false) }}
        >
          <table data-number-column={props.isNumberColumnEnabled}>
            {colgroup}
            <tbody>
              {props.isNumberColumnEnabled
                ? addNumberColumnIndexes(props.children)
                : props.children}
            </tbody>
          </table>
        </div>
      )}
    </WidthConsumer>
  );
};

export default Table;
