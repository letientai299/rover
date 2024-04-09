import Accordion from '@/components/atoms/Accordion/Accordion.tsx';
import styles from './FileProperties.module.scss';

export function FileProperties() {
  return (
    <div className={styles.fileProperties}>
      <Accordion.Root className={styles.group} open={true}>
        <Accordion.Header className={styles.groupHeader}>
          General
        </Accordion.Header>
        <Accordion.Body className={styles.groupBody}>
          <ul>
            <li>Name: something</li>
            <li>Type: some other thing</li>
            <li>Created At: {new Date().toLocaleDateString()}</li>
            <li>Modified At: {new Date().toLocaleDateString()}</li>
            <li>Last viewed At: {new Date().toLocaleDateString()}</li>
          </ul>
        </Accordion.Body>
      </Accordion.Root>

      <Accordion.Root className={styles.group} open={true}>
        <Accordion.Header className={styles.groupHeader}>
          Open with
        </Accordion.Header>
        <Accordion.Body className={styles.groupBody}>
          <div>Drop down to choose app here</div>
        </Accordion.Body>
      </Accordion.Root>

      <Accordion.Root className={styles.group} open={true}>
        <Accordion.Header className={styles.groupHeader}>
          Preview
        </Accordion.Header>
        <Accordion.Body className={styles.groupBody}>
          <img
            src="https://images.dog.ceo/breeds/keeshond/n02112350_9112.jpg"
            alt="A random dog"
          />
        </Accordion.Body>
      </Accordion.Root>

      <Accordion.Root className={styles.group}>
        <Accordion.Header className={styles.groupHeader}>
          Sharing and permissions
        </Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Root>
    </div>
  );
}
