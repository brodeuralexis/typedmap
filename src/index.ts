/**
 * A key of a TypedMap.  Such a key consists of a symbol and a phantom type
 * representing the data associated with said key.
 * @param T The type of the value associated with the key
 */
export class Key<T> {
  private phantom?: T

  private identifier: symbol

  /**
   * Creates a new key for the given identifier.
   *
   * If a string is given as an identifier, a new symbol will be created bearing
   * no relationship to any other symbols created from the same identifier.
   * @param identifier The identifier used for this key
   */
  public constructor (identifier: string | symbol) {
    this.phantom = this.phantom
    this.identifier = typeof identifier === 'string' ? Symbol(identifier) : identifier
  }

  /**
   * Creates a new key for the given identifier.
   *
   * If a string is given as an identifier, a symbol will be created by trying
   * to find an existing symbol with the same identifier.
   * @param identifier The identifier used for this key
   * @param T The type of the value associated with the key
   * @returns A key
   */
  public static for<T> (identifier: string | symbol): Key<T> {
    return new Key(typeof identifier === 'string' ? Symbol.for(identifier) : identifier)
  }

  /**
   * Returns the symbol associated with the key.
   */
  public get (): symbol {
    return this.identifier
  }
}

/**
 * Extracts the type of the value associated with the key.
 * @param K The key for which to extract the type
 */
export type KeyType<K extends Key<any>> = K extends Key<infer T> ? T : never

/**
 * A map where all the keys must type their values.
 *
 * Such a type allows consumers of an API to easily extend it for their needs
 * without having to losing type information.
 *
 * Considering the following key declaration:
 * ```ts
 * const DATABASE = Key.for<Database>('DATABASE')
 * ```
 *
 * Assuming we are in the context of an `express`-like library, we could assign
 * the database connection to the `res.locals` key, which is of type `TypedMap`
 * like so:
 * ```ts
 * export async function assignDatabaseConnection (req: Request, res: Response, next: Next) {
 *   res.locals.set(DATABASE, await establishDatabaseConnection())
 *   next()
 * }
 * ```
 *
 * And use it in a handler:
 * ```ts
 * export async function createBlogPost (req: Request, res: Response) {
 *   const db = res.locals.get(DATABASE) // `db` has type `Database`
 *
 *   // ...
 * }
 * ```
 */
export default class TypedMap {
  private data: Map<symbol, any>

  /**
   * Creates a new `TypedMap` with empty values if no argument is provided, or
   * as a shallow copy of the provided one.
   * @param other The `TypedMap` to copy
   */
  public constructor (other?: TypedMap) {
    this.data = other === undefined ? new Map() : new Map(other.data)
  }

  /**
   * Clears all the data in the map.
   */
  public clear (): void {
    this.data.clear()
  }

  /**
   * Deletes a key and it's associated value.
   * @param key The key for which to delete the value
   * @returns Whether the key existed
   */
  public delete (key: Key<any>): boolean {
    return this.data.delete(key.get())
  }

  /**
   * Fetches the value associated with the given key, or returns `undefined` in
   * case there is no value at the specified key.
   * @param key The key for which to fetch the value
   * @param K The type of the key
   * @returns The value associated with the key or `undefined`
   */
  public get<K extends Key<any>> (key: K): KeyType<K> | undefined {
    return this.data.get(key.get())
  }

  /**
   * Checks whether or not the map has a value associated with the given key.
   * @param key The key to check the presence for
   * @returns The presence of a value for the key
   */
  public has (key: Key<any>): boolean {
    return this.data.has(key.get())
  }

  /**
   * Imparts a value to the given key.
   * @param key The key
   * @param value It's value
   * @param K The type of the key
   * @returns This map
   */
  public set<K extends Key<any>> (key: K, value: KeyType<K>): this {
    this.data.set(key.get(), value)
    return this
  }
}
