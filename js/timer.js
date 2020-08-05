const refs = {
  days: document.querySelector('.value[data-value="days"]'),
  hours: document.querySelector('.value[data-value="hours"]'),
  mins: document.querySelector('.value[data-value="mins"]'),
  secs: document.querySelector('.value[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.isActive = false;
    this.countdownTimerId = null;
  }

  showRemainingTime() {
    if (this.isActive) return;

    this.isActive = true;

    const targetDate = new Date(this.targetDate).getTime();
    const currentTime = Date.now();
    const deltaTime = targetDate - currentTime;

    this.updateTimer(deltaTime);

    this.countdownTimerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;

      this.updateTimer(deltaTime);
    }, 1000);
  }

  updateTimer(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 17, 2020'),
});

countdownTimer.showRemainingTime();
