import GamePlay from './GamePlay';
import themse from './themes';
import PositionedCharacter from './PositionedCharacter'
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import {
  generateTeam,
  startFieldGenerator,
  getAvailableDistance,
  getAvailableAttack,
} from './generators';
import { returnStatement } from 'babel-types';



export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.char = [];
    this.player = [new Magician(2), new Swordsman(3), new Bowman(3)];
    this.enemy = [new Vampire(1), new Undead(3), new Daemon(3)];
  }

  init() {
    function randomPositionToPlayer(number) {
      const arrToPlayer = [];
      const arrToEnemy = [];

      for(let i = 0; i < number**2; i++) {
        if (i % number == 0) {
          arrToPlayer.push(i, ++i);
        } else if (i % number == number-2) {
          arrToEnemy.push(i, ++i);
        }
      }

        function spawnIcon(arr) {
            let randomIndex;  
            randomIndex = Math.floor(Math.random() * arr.length);
            let randomElement = arr[randomIndex];
            // arr.splice(randomIndex, 1);
            return randomElement;
        }
      return spawnIcon(arrToEnemy), spawnIcon(arrToPlayer);

    }
    

    this.player.forEach((item)=> {
     this.char.push(new PositionedCharacter(item, randomPositionToPlayer(8)));
    });


        this.enemy.forEach((item)=> {
      this.char.push(new PositionedCharacter(item, randomPositionToPlayer(8)))
    });


    this.gamePlay.drawUi(themse.prairie);
    this.gamePlay.redrawPositions(this.char);
    }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

}
