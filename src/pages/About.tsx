import { useNavigate } from "react-router-dom";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";

const packages = [
  {
    value: "react",
    icon: "react",
    label: "React",
    link: "https://github.com/aykutkardas/react-icomoon",
  },
  {
    value: "react-native",
    icon: "react",
    label: "React Native",
    link: "https://github.com/aykutkardas/react-icomoon#react-native---demo",
  },
  {
    value: "vue",
    icon: "vue",
    label: "Vue",
    link: "https://github.com/aykutkardas/vue-icomoon",
  },
  {
    value: "svelte",
    icon: "svelte",
    label: "Svelte",
    link: "https://github.com/aykutkardas/svelte-icomoon",
  },
  {
    value: "cli",
    icon: "terminal",
    label: "CLI",
    link: "https://github.com/aykutkardas/svgps-cli",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="my-auto flex h-full max-w-full columns-2">
      <div className="w-full">
        <div className="flex w-full max-w-[500px] flex-col items-start justify-center">
          <h2 className="mb-4 text-4xl font-bold text-neutral-900 dark:text-white">
            No need for many files.
          </h2>
          <p className="text-md mb-4 text-neutral-600 dark:text-neutral-300 lg:text-lg">
            This app converts your icon files into a{" "}
            <span className="text-black underline decoration-orange-500 underline-offset-2 dark:text-white">
              single JSON file.
            </span>{" "}
            With this file, you can easily use SVG icons in your{" "}
            <span className="text-black underline  decoration-emerald-500 underline-offset-2 dark:text-white">
              Frontend
            </span>{" "}
            and{" "}
            <span className="text-black underline  decoration-sky-500 underline-offset-2 dark:text-white">
              Mobile
            </span>{" "}
            projects or save your icon collection as a single file.
          </p>
          <Button
            variant={ButtonVariants.Primary}
            onClick={() => navigate("/icons")}
          >
            Start Converting
          </Button>
          <div className="absolute bottom-0 flex justify-center">
            {packages.map((packageItem) => (
              <a
                key={packageItem.label}
                href={packageItem.link}
                className="group inline-flex select-none items-center p-2 text-sm opacity-75 hover:opacity-100 dark:text-white sm:text-base"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  icon={packageItem.icon}
                  className="mr-1 h-3 w-3 grayscale group-hover:grayscale-0  sm:h-4 sm:w-4"
                />
                <span>{packageItem.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full"></div>
    </div>
  );
};

export default About;
