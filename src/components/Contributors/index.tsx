const Contributors = () => {
  const contributors = [
    "https://github.com/aykutkardas",
    "https://github.com/gizemnkorkmaz",
  ];

  return (
    <div className="flex flex-col items-center mt-8 h-96">
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">
        Contributors
      </h3>
      <div className="flex gap-3">
        {contributors.map((gitHubUrl) => (
          <a key={gitHubUrl} href={gitHubUrl} target="_blank" rel="noreferrer">
            <img
              src={`${gitHubUrl}.png`}
              alt="Contributor profile"
              className="w-[50px] h-[50px] rounded-full"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
