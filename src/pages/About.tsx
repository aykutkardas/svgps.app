import { useNavigate } from "react-router-dom";

import Button from "src/components/Button";
import Example from "src/components/Example";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="my-auto flex h-full max-w-full flex-col lg:flex-row">
      <div className="flex h-screen w-full items-center md:h-auto">
        <div className="flex w-full max-w-[600px] flex-col items-start justify-center">
          <h2 className="mb-3 bg-gradient-to-r from-purple-500 to-pink-700 bg-clip-text text-5xl font-bold text-transparent">
            No need for many files.
          </h2>
          <p className="text-md mb-6 text-neutral-600 dark:text-neutral-300 lg:text-lg">
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
            projects.
          </p>
          <Button
            className="bg-purple-700 px-8 text-white ring-purple-600 hover:bg-purple-600"
            onClick={() => navigate("/icons")}
          >
            Start Converting
          </Button>
        </div>
      </div>
      <div className="mx-0 mt-6  hidden h-screen sm:mx-2 sm:mt-0 md:h-auto lg:flex">
        <Example />
      </div>
    </div>
  );
};

export default About;
