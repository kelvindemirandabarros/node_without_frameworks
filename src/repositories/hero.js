import { readFile, writeFile } from 'node:fs/promises';

export default class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async #current_file_content() {
    return JSON.parse(await readFile(this.file));
  }

  find() {
    return this.#current_file_content();
  }

  async create(data) {
    const current_file = await this.#current_file_content();

    current_file.push(data);

    await writeFile(this.file, JSON.stringify(current_file));

    return data.id;
  }
}

// Just test.
// const hero_repository = new HeroRepository({
//   file: './src/database/data.json'
// });

// console.log(
//   await hero_repository.create({
//     id: 2,
//     name: 'Chapolin'
//   })
// );

// console.log(await hero_repository.find());
