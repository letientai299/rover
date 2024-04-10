import React, { HTMLAttributes, ReactElement, useId, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { Button, Float, IconButton } from 'src/components';
import { Icon } from 'src/components/atoms';
import { MenuProps } from 'src/components/atoms/Menu/Menu.tsx';

import styles from 'src/components/atoms/Tabs/Tabs.module.scss';
import { cx } from 'src/utils';

export type Tab = {
  icon: Icon;
  title: string;
  content?: ReactElement;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  menu?: ReactElement<MenuProps>;
}

const Tabs = (props: TabsProps) => {
  const { menu, tabs, className, ...rest } = props;
  const [index, setIndex] = useState(0);

  const titles = tabs.map((tab: Tab, i: number) => {
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
    <div className={cx(styles.tabs, className)} {...rest}>
      <div className={styles.titles}>
        {titles}
        {menu && <MenuButton menu={menu} />}
      </div>
      <div className={styles.content}>{tabs[index].content}</div>
    </div>
  );
};

interface MenuButtonProps {
  menu: React.ReactElement<MenuProps>;
}

function MenuButton({ menu }: MenuButtonProps) {
  const id = useId();
  const [showMenu, setShowMenu] = useState(false);
  const show = () => setShowMenu(true);
  const hide = () => setShowMenu(false);

  return (
    <>
      <div className={styles.spacer} />
      <IconButton
        id={id}
        icon={FiMoreVertical}
        className={styles.tools}
        onClick={show}
        onBlur={hide}
      />
      {showMenu && (
        <Float anchor={id} place={'bottom-end'} onBlur={hide}>
          {menu}
        </Float>
      )}
    </>
  );
}

export default Tabs;
