[![Build Status](https://travis-ci.org/brodeuralexis/typedmap.svg?branch=master)](https://travis-ci.org/brodeuralexis/typedmap)

# TypedMap

A runtime typed map for use with TypeScript allowing easy extension by users.

## Getting Started

With `npm`:
```sh
npm install --save typedmap
```

With `yarn`:
```sh
yarn add typedmap
```

## Using `TypedMap`

`TypedMap`'s API is as close as possible to `ES6`'s `Map` API.  Some functionnalities like `forEach` were not implemented.

`Key`'s API is as close as possible to `ES6`'s `Symbol` API.

### Creating a `Key`

```ts
import { Key } from 'typedmap'

const DATABASE = Key.for<Database>('DATABASE')
```

### Creating a `TypedMap`
```ts
import TypedMap from 'typedmap'

const map = new TypedMap()
```

### Assigning a value to a key
```ts
map.set(DATABASE, await getDatabaseConnection())
```

### Reading a value
```ts
const database = map.get(DATABASE)

if (database != null) {
  database.run('...')
}
```

### Checking for the presence of a `Key`
```ts
map.has(DATABASE)
```

### Deleting a `Key`
```ts
map.delete(DATABASE)
```

### Clearing a `TypedMap`
```ts
map.clear()
```

## Contributing

Contributions are wholeheartedly welcomed.  Please fork this repo and use a pull request.  Pull requests with failing test, linting errors or merge conflicts will not be merged until resolved.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/brodeuralexis/typedmap/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [Billie Thompson](https://github.com/PurpleBooth) for this `README.md` template
* Rust's TypeMap
