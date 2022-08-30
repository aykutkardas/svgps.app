import { Fragment, useEffect, useState } from "react";
import lookie from "lookie";
import cx from "classnames";
import { Popover, Transition } from "@headlessui/react";

import Icon from "src/components/Icon";

import data from "src/notifications.json";

const Notification = () => {
  const { notifications, notificationTime } = data;
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const lastTime = lookie.get("lastNotificationReadTime") || 0;

    if (notificationTime > lastTime) {
      setHasNew(true);
    }
  }, [notificationTime]);

  const handleOpen = () => {
    lookie.set("lastNotificationReadTime", new Date().getTime());
    setHasNew(false);
  };

  return (
    <Popover className="relative">
      <Popover.Button as="div" onClick={handleOpen}>
        {hasNew && (
          <div className="absolute right-0 h-3 w-3 rounded-full border-2 border-neutral-50 bg-red-500 dark:border-neutral-900" />
        )}
        <Icon
          icon="bell"
          size={20}
          className={cx(
            "cursor-pointer select-none text-neutral-700 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300"
          )}
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-52  transform">
          {({ close }) => (
            <div className="flex flex-col divide-y overflow-hidden rounded-md border border-neutral-100 bg-white font-normal shadow-xl dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
              {notifications.map((notification) => (
                <a
                  key={notification.id}
                  href={notification.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group outline-0 focus:ring-0"
                >
                  <div
                    className={cx(
                      "cursor-pointer p-3 text-xs focus-visible:!outline-0",
                      "text-neutral-500 hover:bg-purple-300/20 group-focus:bg-purple-300/20 dark:text-neutral-400 dark:hover:bg-purple-500/10 dark:group-focus:bg-purple-500/10",
                      "ring-0 [&_b]:text-neutral-600 [&_b]:dark:text-neutral-300"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: notification.title.replace(/`(.*)`/, "<b>$1</b>"),
                    }}
                  />
                </a>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Notification;
