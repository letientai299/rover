import { Button, IconButton, Tree } from '@/components';
import { DocModel, docs } from '@/main/docs/docsMap.ts';
import { NodeIconProps, NodeProps } from '@/components/Tree/types.ts';
import { match } from 'ts-pattern';
import { FiLoader } from 'react-icons/fi';
import { FaFilePen, FaFolderClosed, FaFolderOpen } from 'react-icons/fa6';
import { Link, useLocation } from 'wouter';

function DocView({ node }: NodeProps<DocModel>) {
  const [loc] = useLocation();
  if (node.kind == 'dir') {
    return <Button disabled>{node.name}</Button>;
  }

  const isCurrent = node.path === loc.replace('/', '');
  return (
    <Link to={node.path} asChild>
      <Button disabled={isCurrent}>{node.name}</Button>
    </Link>
  );
}

function DocViewIcon({ node, reveal, toggleReveal }: NodeIconProps<DocModel>) {
  const loading = reveal === 'loading';
  const icon = match(reveal)
    .with('loading', () => FiLoader)
    .with('open', () => (node.kind === 'dir' ? FaFolderOpen : FaFilePen))
    .with('close', () => (node.kind === 'dir' ? FaFolderClosed : FaFilePen))
    .exhaustive();

  return (
    <IconButton
      icon={icon}
      onClick={toggleReveal}
      disabled={loading || node.kind !== 'dir'}
    />
  );
}

const Nav = () => {
  return (
    <nav>
      <Tree data={docs} render={DocView} renderIcon={DocViewIcon} open />
    </nav>
  );
};

export default Nav;
