import { HTMLAttributes, ReactElement, useState } from 'react';

import { Button } from '@/components';

import styles from './tabs.module.scss';
import { IconSrc } from '@/components/Icon/Icon.tsx';

export type Tab = {
  icon: IconSrc;
  title: string;
  content?: ReactElement;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
}

// TODO: store tabs state

const Tabs = (props: TabsProps) => {
  const [index, setIndex] = useState(0);

  const titles = props.tabs.map((tab: Tab, i: number) => {
    return (
      <Button
        key={`${i}|${tab.title}`}
        icon={tab.icon}
        className={styles.title}
        data-selected={index === i}
        onClick={() => setIndex(i)}
      >
        {tab.title}
      </Button>
    );
  });

  return (
    <div className={styles.tabs}>
      <div className={styles.titles}>{titles}</div>
      <div className={styles.content}>{props.tabs[index].content}</div>
    </div>
  );
};

export default Tabs;
