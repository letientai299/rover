import { Button } from '@/components';
import { FiFile, FiFolder } from 'react-icons/fi';

import styles from './fileList.module.scss';

const files = new Array(12).fill(0).map((_, i) => `a_${i}.json`);
const dirs = new Array(12).fill(0).map((_, i) => `some_dir_${i}`);
const content = [...files, ...dirs];

function FileList() {
  const kids = content
    .sort(dirFist)
    .map((name) => <FileItem key={name} name={name} kind={isFile(name)} />);
  return <div className={styles.fileList}>{kids}</div>;
}

function dirFist(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (isFile(a) === isFile(b)) {
    return a.localeCompare(b);
  }

  if (isFile(a) === 'dir') {
    return -1;
  }

  return 1;
}

function FileItem(props: { name: string; kind: 'dir' | 'file' }) {
  const { name, kind } = props;
  return <Button icon={kind === 'dir' ? FiFolder : FiFile}>{name}</Button>;
}

function isFile(name: string): 'dir' | 'file' {
  return name.endsWith('.json') ? 'file' : 'dir';
}

export default FileList;
