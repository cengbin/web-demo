import History from './History'

const HASH_CHANGE = 'hashchange';

export default class HashHistory extends History {
  constructor (router) {
    super(router);

    this.onHashChangeListener = this.onHashChangeListener.bind(this);

    window.addEventListener(HASH_CHANGE, this.onHashChangeListener);
  }

  onHashChangeListener (event) {
    // console.log('onHashChangeListener:', event)
    let hash = this.getHash();
    let arr = hash.split(':');
    let path = arr[0] ? arr[0] : '';
    let param = arr[1] ? arr[1] : '';

    this.parse(path, param);
  }

  go (path) {
    super.go(path);

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