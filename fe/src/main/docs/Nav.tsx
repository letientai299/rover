import { Button, Tree } from '@/components';
import { DocModel, docsTree } from '@/main/docs/docsMap.ts';
import { Reveal, RowProps } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import { FiLoader } from 'react-icons/fi';
import { FaFilePen, FaFolderClosed, FaFolderOpen } from 'react-icons/fa6';
import { Link, useLocation } from 'wouter';

function DocView({ node, reveal, toggleReveal }: RowProps<DocModel>) {
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

function pickIcon(reveal: Reveal, node: DocModel) {
  return match(reveal)
    .with('loading', () => FiLoader)
    .with('open', () => (node.kind === 'dir' ? FaFolderOpen : FaFilePen))
    .with('close', () => (node.kind === 'dir' ? FaFolderClosed : FaFilePen))
    .exhaustive();
}

const Nav = () => {
  return (
    <nav>
      <Tree data={docsTree} render={DocView} open />
    </nav>
  );
};

export default Nav;
