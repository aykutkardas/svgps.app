import Link from "next/link";
import Button, { ButtonVariants } from "src/components/Button";

const PageNotFound = () => {
  return (
    <div className="my-auto py-8 text-center">
      <div className="mb-10 text-8xl text-neutral-700 dark:text-neutral-200">
        404
      </div>

      <Link href="/">
        <Button variant={ButtonVariants.Secondary} className="mb-4">
          Back to home
        </Button>
      </Link>
      <p className="text-neutral-500 dark:text-neutral-400">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default PageNotFound;
