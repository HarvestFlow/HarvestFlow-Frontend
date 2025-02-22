
import { SlideUp, SlideDown } from '../index';


export default function SlideToggle(target, duration = 500) {
  if (window.getComputedStyle(target).display === 'none') {
    return SlideUp(target, duration);
  } else {
    return SlideDown(target, duration);
  }
};