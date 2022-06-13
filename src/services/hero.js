export default class HeroService {
  constructor({ hero_repository }) {
    this.hero_repository = hero_repository;
  }

  find() {
    return this.hero_repository.find();
  }

  create(data) {
    return this.hero_repository.create(data);
  }
}
