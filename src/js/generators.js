// const Bowman = require('./characters/Bowman');
// const Daemon = require('./characters/Daemon');
// const Magician = require('./characters/Magician');
// const Swordsman = require('./characters/Swordsman');
// const Undead = require('./characters/Undead');
// const Vampire = require('./characters/Vampire');
// const Team = require('./Team.js');
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magican from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Team from './Team.js';

// TODO: Написать тесты для проверки генерации случайного перса и максимального уровня!
export function* characterGenerator(allowedTypes, maxLevel) {
  const randomIndex = Math.floor(Math.random() * allowedTypes.length);
  const RandomClass = allowedTypes[randomIndex];
  const level = Math.floor(Math.random() * maxLevel) + 1;
  const character = new RandomClass(level);
  yield character;

}


/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characters = [];
  for (let i = 0; i < characterCount; i += 1) {
    characters.push(characterGenerator(allowedTypes, maxLevel).next().value);
  }
  return characters;
}

generateTeam([Bowman, Daemon, Swordsman, Undead, Vampire],3,4 );
