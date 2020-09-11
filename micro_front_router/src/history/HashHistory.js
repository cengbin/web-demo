import History from './History'

const HASH_CHANGE = 'hashchange';

export default class HashHistory extends History {
  constructor () {
    super();
    this.onHashChangeListener = this.onHashChangeListener.bind(this)
  }

  init () {
    window.addEventListener(HASH_CHANGE, this.onHashChangeListener);
  }

  onHashChangeListener (event) {
    // console.log('onHashChangeListener:', event)
    console.log(this.getHash())
  }

  push (path) {
    this.setHash(path)
  }

  getHash () {
    let hash = window.location.hash.replace('#', '');
    return hash;
  }

  setHash (path) {
    window.location.hash = path;
  }
}