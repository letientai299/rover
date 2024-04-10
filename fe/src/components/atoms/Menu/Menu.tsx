import styles from './Menu.module.scss';

export interface MenuProps {}

const Menu = (props: MenuProps) => {
  return (
    <div className={styles.menu}>
      <ul>
        <li>Some 1</li>
        <li>Some 2</li>
        <li>Some 3</li>
        <li>Some 4</li>
      </ul>
    </div>
  );
};

export default Menu;
