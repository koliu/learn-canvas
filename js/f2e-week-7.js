import util from './canvas-util.js';
import ship from './ship.js';
import bullet from './bullet.js';

export default {
  colors: {
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    red: (opacity = 1) => `rgba(231, 70, 93, ${opacity})`,
    yellow: (opacity = 1) => `rgba(245,175, 95, ${opacity})`,
    blue: (opacity = 1) => `rgba(54, 118, 187, ${opacity})`,
    darkBlue: (opacity = 1) => `rgba(0, 29, 46, ${opacity})`,
    darkGreen: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    transparent: () => 'rbga(0, 0, 0, 0)'
  },
  components: {
    ship,
    bullet
  }
}
