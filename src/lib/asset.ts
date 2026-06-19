const basePath = process.env.NODE_ENV === "production" ? "/infocob" : "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
