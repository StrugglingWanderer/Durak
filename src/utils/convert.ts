export type StructureCopy<T, U> = {
  [K in keyof T]: T[K] extends object ? StructureCopy<T[K], U> : U;
};

export function toBoolean<T extends object>(value: T): StructureCopy<T, boolean>;
export function toBoolean<T>(value: T): boolean;
export function toBoolean<T>(value: T): boolean | StructureCopy<T, boolean> {
  if (Array.isArray(value)) {
    return value.map(toBoolean) as StructureCopy<T, boolean>;
  }

  if (value && typeof value === 'object') {
    const object: StructureCopy<T, boolean> = Object.create(null);
    for (const key in value)
      object[key] = toBoolean(value[key]) as T[typeof key] extends object
        ? StructureCopy<T[typeof key], boolean>
        : boolean;

    return object;
  }

  return value === 'false' || value === '0' ? false : Boolean(value);
}
