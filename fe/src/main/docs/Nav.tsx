import { Button, Tree } from '@/components';
import { Reveal, RowProps } from '@/components/Tree/types.ts';
import { Model, Notes } from '@/main/docs/notes.ts';
import { IconType } from 'react-icons';
import {
  FaFile,
  FaFileCode,
  FaRegFolder,
  FaRegFolderOpen,
} from 'react-icons/fa6';
import { FiLoader } from 'react-icons/fi';
import { match } from 'ts-pattern';
import { Link, useLocation } from 'wouter';

function DocView({ node, reveal, toggleReveal }: RowProps<Model>) {
  const [loc] = useLocation();
  const icon = pickIcon(reveal, node);
  if (node.kind === 'dir') {
    return (
      <Button icon={icon} onClick={toggleReveal}>
        {node.name}
      </Button>
    );
  }

  const isCurrent = node.path === loc;
  return (
    <Link to={node.path} asChild>
      <Button
        disabled={isCurrent}
        icon={icon}
        kind={isCurrent ? 'primary' : 'normal'}
      >
        {node.name}
      </Button>
    </Link>
  );
}

function fileIcon(name: string): IconType {
  return name.endsWith('.mdx') ? FaFileCode : FaFile;
}

function pickIcon(reveal: Reveal, node: Model) {
  return match(reveal)
    .with('loading', () => FiLoader)
    .with('open', () =>
      node.kind === 'dir' ? FaRegFolderOpen : fileIcon(node.name),
    )
    .with('close', () =>
      node.kind === 'dir' ? FaRegFolder : fileIcon(node.name),
    )
    .exhaustive();
}

const Nav = () => {
  return (
    <nav>
      <Tree data={Notes.tree} render={DocView} open />
    </nav>
  );
};

export default Nav;
