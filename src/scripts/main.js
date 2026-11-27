import { initialLoad } from './initialLoad.js';
import { speedTest } from './speedTest.js';

if (await initialLoad()) {
  speedTest()
}
