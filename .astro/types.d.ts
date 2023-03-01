declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"benchmarking-using-deno.md": {
  id: "benchmarking-using-deno.md",
  slug: "benchmarking-using-deno",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"css-counter.md": {
  id: "css-counter.md",
  slug: "css-counter",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"cut-the-bug-chase-with-git-bisect.md": {
  id: "cut-the-bug-chase-with-git-bisect.md",
  slug: "cut-the-bug-chase-with-git-bisect",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"hex-to-rgb-to-hsl-in-deno.md": {
  id: "hex-to-rgb-to-hsl-in-deno.md",
  slug: "hex-to-rgb-to-hsl-in-deno",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"ignoring-files-when-formatting-with-deno.md": {
  id: "ignoring-files-when-formatting-with-deno.md",
  slug: "ignoring-files-when-formatting-with-deno",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"iteration.md": {
  id: "iteration.md",
  slug: "iteration",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"read-files-recursively-in-deno.md": {
  id: "read-files-recursively-in-deno.md",
  slug: "read-files-recursively-in-deno",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"recursion.md": {
  id: "recursion.md",
  slug: "recursion",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"til-web-image-format-which-one-to-choose.md": {
  id: "til-web-image-format-which-one-to-choose.md",
  slug: "til-web-image-format-which-one-to-choose",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
