import Link from "next/link";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Button from "src/components/Button";
import SupportButton from "src/components/SupportButton";
import Sample from "src/components/Sample";
import Head from "next/head";

const HomePage = () => (
  <div className="container mx-auto flex h-screen flex-col p-3">
    <Head>
      <title>SVGPS - Free Icons, Icon converter.</title>
    </Head>
    <Header />
    <div className="my-auto flex h-full max-w-full flex-col lg:flex-row">
      <div className="mr-auto flex grow items-center md:h-auto">
        <div className="flex w-full max-w-[600px] flex-col items-start justify-center">
          <h2 className="mb-3 bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-5xl font-bold text-transparent">
            No need for
            <span className="block">a bunch of files!</span>
          </h2>
          <p className="mb-6 text-base text-neutral-600 dark:text-neutral-300 lg:text-lg">
            <span className="font-bold">SVGPS</span> removes the burden of
            working with a cluster of SVG files by converting your icons into{" "}
            <span className="border-b border-dotted border-emerald-400 dark:text-emerald-400/90">
              a single JSON file.
            </span>{" "}
            You can easily use this file in your{" "}
            <span className="border-b border-dotted border-violet-400 dark:text-violet-400/90">
              frontend
            </span>{" "}
            or{" "}
            <span className="border-b border-dotted border-pink-400 dark:text-pink-400/90">
              mobile
            </span>{" "}
            projects.
          </p>
          <div className="space-x-4 space-y-4 sm:space-y-0">
            <Link href="/collection">
              <Button variant="primary" className="h-11">
                Start Converting
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="ghost" onClick={() => "/store"}>
                Explore Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-0 mt-6 hidden grow sm:mx-2 sm:mt-0 md:h-auto lg:flex">
        <Sample className="ml-auto" />
      </div>
      <SupportButton />
    </div>
    <Footer />
  </div>
);

export default HomePage;
