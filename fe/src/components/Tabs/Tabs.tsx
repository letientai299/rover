import { HTMLAttributes, ReactElement, useState } from 'react';

import { Button, IconButton } from '@/components';
import { IconType } from 'react-icons';

import styles from './tabs.module.css';
import { FiMoreVertical } from 'react-icons/fi';

export type Tab = {
  icon: IconType,
  title: string,
  content?: ReactElement,
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  // TODO: implement menu
  moreMenu?: string[];
}

// TODO: store tabs state

const Tabs = (props: TabsProps) => {
  const [index, setIndex] = useState(0);

  const titles = props.tabs.map((tab: Tab, i: number) => {
      return <Button key={`${i}|${tab.title}`}
                     icon={tab.icon}
                     className={styles.title}
                     data-selected={index === i}
                     onClick={() => setIndex(i)}
      >
        {tab.title}
      </Button>;
    },
  );

  const moreMenu = props.moreMenu ?? [];

  return (
    <div className={styles.tabs}>
      <div className={styles.titles}>
        {titles}
        {moreMenu.length !== 0 &&
          <>
            <span style={{ flexGrow: 1 }} />
            <IconButton icon={FiMoreVertical} />
          </>
        }
      </div>
      <div className={styles.content}>
        {props.tabs[index].content}
      </div>
    </div>
  );
};


export default Tabs;
