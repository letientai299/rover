import { Expand, Icon, IconButton, Tooltip } from '@/components/atoms';

import { cx } from '@/utils';
import { useId } from 'react';
import { BiExtension } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineBookmarks, MdOutlineFavoriteBorder } from 'react-icons/md';

import styles from './activityBar.module.scss';

export function ActivityNav() {
  const active = 'Favorites';

  const activities: [Icon, string][] = [
    [MdOutlineFavoriteBorder, 'Favorites'],
    [MdOutlineBookmarks, 'Bookmarks'],
  ];

  const configs: [Icon, string][] = [
    [BiExtension, 'Extensions'],
    [FiSettings, 'Settings'],
  ];

  const render = (set: [Icon, string][]) =>
    set.map(([icon, tip]) => (
      <ActivityNavItem
        icon={icon}
        tip={tip}
        active={tip === active}
        key={tip}
      />
    ));

  return (
    <div className={styles.nav}>
      {render(activities)}
      <Expand />
      {render(configs)}
    </div>
  );
}

const ActivityNavItem = (props: ActivityNavItemProps) => {
  const { icon, tip, active } = props;
  const id = useId();
  return (
    <>
      <IconButton
        id={id}
        icon={icon}
        className={cx(styles.icon, active ? styles.active : '')}
      />
      <Tooltip anchor={id} place={'right'}>
        {tip}
      </Tooltip>
    </>
  );
};

interface ActivityNavItemProps {
  icon: Icon;
  tip: string;
  active?: boolean;
}
