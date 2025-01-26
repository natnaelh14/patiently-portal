import type { ComponentPropsWithoutRef } from "react";
import dynamic from "next/dynamic";
import type { icons } from "~/constants";

import { cn } from "~/utils/helpers";

type PropsWeControl = "alt" | "aria-hidden" | "width" | "height";
type Size = keyof typeof sizeMap;
interface IconProps extends Omit<ComponentPropsWithoutRef<"svg">, PropsWeControl> {
  name: (typeof icons)[number];
  size?: Size;
  divClasses?: string | string[];
}

const sizeMap = {
  "12": {
    class: "size-3",
    dimensions: 12,
  },
  "16": {
    class: "size-4",
    dimensions: 16,
  },
  "24": {
    class: "size-6",
    dimensions: 24,
  },
  "32": {
    class: "size-8",
    dimensions: 32,
  },
  "48": {
    class: "size-12",
    dimensions: 48,
  },
  "56": {
    class: "size-14",
    dimensions: 56,
  },
  "80": {
    class: "size-20",
    dimensions: 80,
  },
};

export function SquareIcon(props: IconProps): JSX.Element {
  const { className, divClasses, ...rest } = props;
  const size = props.size || "24";

  const DynamicIcon = dynamic<JSX.IntrinsicElements["svg"]>(
    () => import(`~/public/static/icons/${props.name}.svg?react`),
    { ssr: false }
  );

  return (
    <div className={cn("inline-flex items-center justify-center", sizeMap[size].class, divClasses)}>
      <DynamicIcon
        className={cn(className)}
        aria-hidden="true"
        width={sizeMap[size].dimensions}
        height={sizeMap[size].dimensions}
        {...rest}
      />
    </div>
  );
}
