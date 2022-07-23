import styles from "./Contributors.module.css";

const Contributors = () => {
  const contributors = [
    "https://github.com/aykutkardas",
    "https://github.com/gizemnkorkmaz",
  ];

  return (
    <div className={styles.Contributors}>
      <h3>Contributors</h3>
      <div className={styles.Contributor}>
        {contributors.map((gitHubUrl) => (
          <a key={gitHubUrl} href={gitHubUrl} target="_blank" rel="noreferrer">
            <img
              src={`${gitHubUrl}.png`}
              alt="Contributor profile"
              className={styles.ContributorImg}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
