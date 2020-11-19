export default (ctx) => {
  const SAMPLE_RATE = 10000;
  setTimeout(() => {
    let lastSample = Date.now();
    function sample() {
      if (Date.now() - lastSample >= SAMPLE_RATE * 2) {
        ctx.app.router.go()
      }
      lastSample = Date.now();
      setTimeout(sample, SAMPLE_RATE);
    }

    sample();
  }, SAMPLE_RATE)
}
