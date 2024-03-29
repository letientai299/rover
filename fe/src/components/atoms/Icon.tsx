import { ComponentType, HTMLAttributes, SVGAttributes } from 'react';

/**
 * IconSrc is a helper type to abstract away the dependency on the `IconType` of
 * `react-icons` package, in case we later move away from it. This type allows
 * usage of `<img>` besides `<svg>`, so that we can use PNG, GIF or JPEG
 * as icon as well.
 */
export type Icon =
  | ComponentType<SVGAttributes<SVGElement>>
  | ComponentType<HTMLAttributes<HTMLImageElement>>;
