import clsx from "clsx";

import Icon from "src/components/Icon";

const FeatureTable = () => {
  const featureList = [
    {
      feature: "Convert to JSON",
      values: [true, true, true],
    },
    {
      feature: "Copy as SVG",
      values: [true, true, true],
    },
    {
      feature: "Copy as JSX",
      values: [true, true, true],
    },
    {
      feature: "Download as SVG",
      values: [true, true, true],
    },
    {
      feature: "Download as JSX",
      values: [true, true, true],
    },
    {
      feature: "Multiple Download as SVG",
      values: [false, true, true],
    },
    {
      feature: "Multiple Download as JSX",
      values: [false, true, true],
    },
    {
      feature: "Collection Limit",
      values: [1, 3, "Unlimited"],
    },
    {
      feature: "Sync Collection",
      values: [false, true, true],
    },
    {
      feature: "Share Collection",
      values: [false, false, true],
    },
    {
      feature: "Customization",
      values: [false, false, true],
    },
  ];

  return (
    <table>
      <thead>
        <tr className="text-sm text-neutral-400">
          <th className="pb-3 text-left font-normal">Feature</th>
          <th className="w-16 pb-3 text-center font-normal">Visitor</th>
          <th className="w-16 pb-3 text-center font-normal">User</th>
          <th className="relative w-16 pb-3 text-center font-normal">
            Pro User
            <span className="absolute -top-5 right-1 rounded-lg bg-violet-400/60 px-1 text-[10px] text-white">
              Soon
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {featureList.map((feature, index) => (
          <tr
            key={feature.feature}
            className={clsx("text-xs text-neutral-200", index > 0 && "w-96")}
          >
            <td className="w-40 py-1">{feature.feature}</td>
            {feature.values.map((value, index) => (
              <td key={index} className="text-center text-xs">
                {typeof value === "boolean" ? (
                  <Icon
                    icon={value ? "check" : "close"}
                    size={20}
                    className={clsx(
                      value ? "text-emerald-400" : "text-neutral-600"
                    )}
                  />
                ) : (
                  value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeatureTable;
