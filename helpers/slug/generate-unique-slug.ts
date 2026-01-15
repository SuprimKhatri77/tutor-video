import slugify from "slugify";
import { nanoid } from "nanoid";

export function generateUniqueSlug(title: string) {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${baseSlug}-${nanoid(6)}`;
}
