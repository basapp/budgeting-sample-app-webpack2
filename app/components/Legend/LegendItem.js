// @flow
import * as React from 'react';
import formatAmount , { formatPercent } from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  usePercentSign: boolean,
};

const LegendItem = ({ color, label, value, usePercentSign }: LegendItemProps) => (
  <li style={{ color }}>
    <span>{label}</span>
    <span className={styles.value}> { usePercentSign? formatPercent(value) : formatAmount(value).text } </span>
  </li>
);

export default LegendItem;
