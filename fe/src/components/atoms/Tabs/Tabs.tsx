import React, { HTMLAttributes, ReactElement, useId, useState } from 'react';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import { Float, IconButton } from 'src/components';
import { Icon } from 'src/components/atoms';
import { MenuProps } from 'src/components/atoms/Menu/Menu.tsx';

import styles from 'src/components/atoms/Tabs/Tabs.module.scss';
import { cx } from 'src/utils';
import { clampIn } from '../../../utils/numbers';
import { Button } from 'src/components/atoms/Button';

export type Tab = {
  icon: Icon;
  title: string;
  content?: ReactElement;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  selectedIndex?: number;
  tabs: Tab[];
  menu?: ReactElement<MenuProps>;
}

const Tabs = (props: TabsProps) => {
  const { menu, tabs, selectedIndex = 0, className, ...rest } = props;
  const selected = clampIn(tabs, selectedIndex);
  const [index, setIndex] = useState(selected);

  const titles = tabs.map((tab: Tab, i: number) => {
    const pick = () => setIndex(i);
    return (
      <Button
        key={`${i}|${tab.title}`}
        className={styles.title}
        data-selected={index === i}
        kind={i === index ? 'primary' : 'normal'}
        onClick={pick}
        icon={tab.icon}
      >
        {tab.title}
      </Button>
    );
  });

  return (
    <div className={cx(styles.tabs, className)} {...rest}>
      <div className={styles.titles}>
        {titles}
        <AddTabButton />
        {menu && <MenuButton menu={menu} />}
      </div>
      <div className={styles.content}>{tabs[index].content}</div>
    </div>
  );
};

function AddTabButton() {
  return <IconButton icon={FiPlus} />;
}

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
