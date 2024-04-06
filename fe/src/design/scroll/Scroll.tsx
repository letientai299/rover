import { Button } from '@/components';
import { FiGrid, FiPlusSquare } from 'react-icons/fi';
import styles from './scroll.module.scss';

function Addr() {
  const count = 7;
  return <div className={styles.addr}>{'something-'.repeat(count)}</div>;
}

function Buttons() {
  const kids = new Array(5).fill(0).map((_, i) => (
    <Button icon={FiGrid} key={i}>
      btn {i}
    </Button>
  ));

  kids.unshift(
    <Button icon={FiPlusSquare} key={'add'}>
      Add item
    </Button>,
  );

  kids.unshift(
    <Button icon={FiPlusSquare} key={'add'}>
      Add buttons
    </Button>,
  );
  return <div className={styles.buttons}>{kids}</div>;
}

const Scroll = () => {
  const numItems = 20;
  return (
    <div className={styles.scrollContainer}>
      <Addr />
      <Buttons />
      <List n={numItems} />
    </div>
  );
};

function List({ n }: { n: number }) {
  const items = new Array(n).fill(0).map((_, i) => <div key={i}>item {i}</div>);
  return <div className={styles.list}>{items}</div>;
}

export default Scroll;
