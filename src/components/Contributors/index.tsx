import styles from "./Contributors.module.css";

const Contributors = () => {
  const contributors = [
    {
      gitHubUrl: "https://github.com/aykutkardas",
    },
    {
      gitHubUrl: "https://github.com/gizemnkorkmaz",
    },
  ];

  return (
    <div className={styles.Contributors}>
      <span>Contributors</span>
      <div className={styles.Contributor}>
        {contributors.map(({ gitHubUrl }) => (
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
