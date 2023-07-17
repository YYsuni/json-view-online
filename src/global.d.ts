/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.svg' {
	const src: string
	export default src
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
}

declare type NullableNumber = string | number | null
declare type NullableObject = Record<string, any> | null
declare type NullableArray = Record<string, any>[] | null
declare type Nullable<T> = T | null

declare type PropsWithChildren = React.PropsWithChildren
