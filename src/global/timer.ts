/** timers are in millisecond unit */

class FsbTimer {
  private static readonly LOGIC_RATE = 1000 / 60
  lastExecuted: number = 0
  lastExecutedSecond: number = 0
  elapsed: number = 0

  /**
   * this should be called in requestAnimationFrame
   */
  raf(time: number, delta: number) {
    if(time > this.lastExecuted + FsbTimer.LOGIC_RATE) {
      this.lastExecuted += FsbTimer.LOGIC_RATE
      this.logicUpdate()
    }
    this.elapsed += delta
  }

  /**
   * this should be called in 1/60 interval
   */
  logicUpdate() {
    if(this.lastExecutedSecond + 1000 < this.lastExecuted) {
      this.lastExecutedSecond += 1000
    }
  }
}

const timer = new FsbTimer()
export default timer