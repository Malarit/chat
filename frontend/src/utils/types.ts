export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type KeysOfUnion<T> = T extends T ? keyof T : never;
