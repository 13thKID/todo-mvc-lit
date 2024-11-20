function* idGenerator(): Generator<string, string, unknown> {
  let id = 0;
  while (true) {
    yield `id-${id++}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

const idGen = idGenerator();

export default idGen;
