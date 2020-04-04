// dependencies
import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@material-ui/core/styles';
// @ts-ignore This lib has typings, but TypeScript can't resolve them
// FIXME: Re-configure TypeScript to fix typings
import SwipeableViews from 'react-swipeable-views';

// interface
export interface TabContentsProps {
  value: number;
  onChange: (e: React.ChangeEvent<{}> | null, newIndex: number) => void;
}

// styles
const StyledTabContents = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.spacing(2)}px;
  `}
`;

// react component
const TabContents: React.FC<TabContentsProps> = ({
  value,
  onChange,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const handleChange = (newIndex: number) => {
    onChange(null, newIndex);
  };
  return (
    <StyledTabContents>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChange}
        slideStyle={{ overflow: 'visible', paddingBottom: '1px' }}
        {...rest}
      >
        {children}
      </SwipeableViews>
    </StyledTabContents>
  );
};

// export
export default TabContents;
