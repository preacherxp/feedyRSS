import { Property } from 'csstype';
import React, { HTMLAttributes, ReactElement } from 'react';

type Props = {
  children: unknown;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  flex?: Property.Flex;
  flexFlow?: Property.FlexFlow;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

function FlexContainer(props: Props): ReactElement {
  const {
    children,
    className,
    alignItems,
    justifyContent,
    flex,
    flexFlow,
    ...restProps
  } = props;
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems,
        justifyContent,
        flex,
        flexFlow,
      }}
      {...restProps}
    >
      {children as ReactElement}
    </div>
  );
}

export default FlexContainer;
