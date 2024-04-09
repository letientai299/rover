import { Button } from 'src/components';
import { Icon } from 'src/components/atoms';
import { HTMLAttributes, ReactElement, useState } from 'react';

import styles from 'src/components/atoms/Tabs/Tabs.module.scss';

export type Tab = {
  icon: Icon;
  title: string;
  content?: ReactElement;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
}

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
