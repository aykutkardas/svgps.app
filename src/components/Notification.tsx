import { Fragment, useEffect, useState } from "react";
import lookie from "lookie";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Popover, Transition } from "@headlessui/react";

import Icon from "src/components/Icon";

import notifications from "src/notifications.json";

dayjs.extend(relativeTime);

const Notification = () => {
  const [hasNew, setHasNew] = useState(false);
  const [lastReadTime, setLastReadTime] = useState(new Date().getTime());

  useEffect(() => {
    setLastReadTime(lookie.get("lastNotificationReadTime"));
  }, []);

  useEffect(() => {
    const hasNewNotification = notifications.some(
      (notification) => notification.date > lastReadTime
    );

    setHasNew(hasNewNotification);
  }, [lastReadTime]);

  const handleOpen = () => {
    lookie.set("lastNotificationReadTime", new Date().getTime());
    setHasNew(false);
  };

  return (
    <Popover className="relative">
      <Popover.Button as="div" onClick={handleOpen}>
        <div
          className={clsx(
            "absolute right-0 h-3 w-3 rounded-full border-2 transition duration-300",
            "border-neutral-50 bg-red-500 dark:border-neutral-900",
            hasNew ? "opacity-100" : "opacity-0"
          )}
        />
        <Icon
          icon="bell"
          size={20}
          className={clsx(
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
        <Popover.Panel className="absolute right-0 z-20 mt-2 w-60 transform">
          {({ close }) => (
            <div
              className={clsx(
                "flex flex-col divide-y overflow-hidden rounded-md border shadow-xl",
                "border-neutral-100 bg-white font-normal",
                "dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              {notifications.map((notification) => (
                <a
                  key={notification.id}
                  href={notification.link}
                  target={notification.link?.startsWith("/") ? "" : "_blank"}
                  rel="noreferrer"
                  className={clsx(
                    "group outline-0 focus:ring-0",
                    "text-neutral-500 hover:bg-purple-300/20 group-focus:bg-purple-300/20 dark:text-neutral-400 dark:hover:bg-purple-500/10 dark:group-focus:bg-purple-500/10",
                    notification.link ? "cursor-pointer " : "cursor-default"
                  )}
                  onClick={() => close()}
                >
                  <div
                    className={clsx(
                      "p-3 pb-1 text-xs focus-visible:!outline-0",
                      "ring-0 [&_b]:text-neutral-600 [&_b]:dark:text-neutral-300",
                      notification.date > lastReadTime
                        ? "opacity-100"
                        : "opacity-50"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: notification.title.replace(
                        /`(.[^`]*)`/g,
                        "<b>$1</b>"
                      ),
                    }}
                  />
                  <span className="flex justify-end px-2 text-[10px] opacity-30">
                    {dayjs(notification.date).fromNow()}
                  </span>
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
