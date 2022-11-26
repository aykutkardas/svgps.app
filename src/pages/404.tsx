import Link from "next/link";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Button from "src/components/Button";

const PageNotFound = () => (
  <div className="container mx-auto flex h-screen flex-col p-3">
    <Header />
    <div className="my-auto py-8 text-center">
      <div className="mb-10 text-8xl text-neutral-700 dark:text-neutral-200">
        404
      </div>

      <Link href="/">
        <Button variant="primary" className="mb-4">
          Back to home
        </Button>
      </Link>
      <p className="text-neutral-500 dark:text-neutral-400">
        The page you are looking for does not exist.
      </p>
    </div>
    <Footer />
  </div>
);

export default PageNotFound;
