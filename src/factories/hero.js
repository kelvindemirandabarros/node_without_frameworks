import HeroRepository from '../repositories/hero';
import HeroService from '../services/hero';

const generate_instance = ({ file_path }) => {
  // Here goes all db connections.
  const hero_repository = new HeroRepository({ file: file_path });
  const hero_service = new HeroService({
    hero_repository
  });

  return hero_service;
};

export { generate_instance };
