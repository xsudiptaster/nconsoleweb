import { Children } from 'react';
export const EachElement = ({ render, of }: any) =>
  Children.toArray(of && of.map((item: any, index: any) => render(item, index)));
