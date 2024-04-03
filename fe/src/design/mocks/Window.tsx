import { PropsWithChildren } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { FiMinus, FiSquare, FiX } from 'react-icons/fi';
import { match } from 'ts-pattern';
import styles from './window.module.scss';

export type Platform = 'win' | 'mac' | 'linux';

type WindowProps = PropsWithChildren<{
  platform: Platform;
}>;

interface TitleBarProps {
  platform: Platform;
}

function TitleBar({ platform }: TitleBarProps) {
  const buttons = match(platform)
    .with('mac', () => (
      <>
        <BsFillCircleFill color={'rgb(237,106,94)'} />
        <BsFillCircleFill color={'rgb(244,191,79)'} />
        <BsFillCircleFill color={'rgb(98,197,84)'} />
      </>
    ))
    .otherwise(() => (
      <>
        <FiMinus />
        <FiSquare />
        <FiX className={styles.closeButton} />
      </>
    ));
  return (
    <div className={styles.titleBar} data-platform={platform}>
      {buttons}
    </div>
  );
}

const Window = (props: WindowProps) => {
  const { platform, children } = props;
  return (
    <div className={styles.window}>
      <TitleBar platform={platform} />
      {children}
    </div>
  );
};

export default Window;
