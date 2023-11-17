import GamePlay from './GamePlay';
import themse from './themes';
import PositionedCharacter from './PositionedCharacter'
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import {randomElementFromArray} from './generators';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.char = [];
    this.player = [new Magician(2), new Swordsman(3), new Bowman(3)];
    this.enemy = [new Vampire(1), new Undead(3), new Daemon(3)];
  }

  init() {
    const borderCellsCount = 8;
    const searchNumber = [];

    this.player.forEach((item)=> {
      const arrToPlayer = Array.from({ length: borderCellsCount * 2 }, (_, i) => {
        return borderCellsCount * Math.floor(i / 2) + (i % 2);
      });

      let randomIndex = randomElementFromArray(arrToPlayer);

      if (searchNumber.includes(randomIndex)) {
        randomIndex = randomElementFromArray(arrToPlayer);
        } 
        searchNumber.push(randomIndex);
        this.char.push(new PositionedCharacter(item, randomIndex));
    });


    this.enemy.forEach((item)=> {
      const arrToEnemy = Array.from({ length: borderCellsCount * 2 }, (_, i) => {
        return borderCellsCount * Math.ceil((i + 1) / 2) + (i % 2) - 2;
      });
      let randomIndex = randomElementFromArray(arrToEnemy)
      if (searchNumber.includes(randomIndex)) {
        randomIndex = randomElementFromArray(arrToEnemy);
        } 
      searchNumber.push(randomIndex);
      this.char.push(new PositionedCharacter(item, randomIndex))
    });


    this.gamePlay.drawUi(themse.prairie);
    this.gamePlay.redrawPositions(this.char);
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    }
   

  onCellClick(index) {

  }

  onCellEnter(index) {
    const message = `🎖1 ⚔10 🛡40 ❤50`;
    this.char.forEach(item => {
      if(item.position == index) {
        this.gamePlay.showCellTooltip(message, index);
        alert(message);
        console.log('test')
      }
    })
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
  

}  
