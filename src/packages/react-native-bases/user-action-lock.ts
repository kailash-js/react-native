/**
 * Lock to prevent user perform any action to quickly on the screen
 * For example: tap a button too fast ---> duplicate action
 */
class UserActionLock {
  keys = new Set<string>();

  lock(key: string) {
    if (this.keys.has(key)) {
      return false;
    }
    this.keys.add(key);
    return true;
  }

  /**
   * Lock key and auto release the lock after an afterDurationMs
   * @param key locked key
   * @param afterDurationMs time to auto unlock the key
   */
  lockAutoRelease({
    key,
    afterDurationMs,
  }: {
    key: string;
    afterDurationMs: number;
  }) {
    if (this.keys.has(key)) {
      return false;
    }
    this.keys.add(key);
    this.autoRelease({key, afterDurationMs});
    //
    return true;
  }

  /**
   * Immmeditately release a key
   * @param key locked key
   */
  release(key: string) {
    this.keys.delete(key);
  }

  /**
   * Auto release a key after a duration of miliseconds
   */
  autoRelease({key, afterDurationMs}: {key: string; afterDurationMs: number}) {
    setTimeout(() => {
      this.keys.delete(key);
    }, afterDurationMs);
  }

  /**
   * Create a specific UserActionLock instance for using on specific purpose
   */
  create(): UserActionLock {
    return new UserActionLock();
  }
}
const instance = new UserActionLock();

export {instance as UserActionLock};
