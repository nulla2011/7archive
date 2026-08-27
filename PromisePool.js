export default class PromisePool {
  running = 0;
  results = [];
  errors = [];

  constructor(tasks, options) {
    this.queue = [...tasks];
    this.options = options
  }

  async run() {
    return new Promise((resolve) => {
      const next = async () => {
        // 全部完成
        if (this.queue.length === 0 && this.running === 0) {
          resolve({
            results: this.results,
            errors: this.errors,
          });
          return;
        }

        // 补任务
        while (this.running < this.options.concurrency && this.queue.length > 0) {
          const task = this.queue.shift();
          this.running++;
          (async () => {
            try {
              const res = await task();
              this.results.push(res);
            } catch (err) {
              this.errors.push(err);
              if (this.options.stopOnError) {
                resolve({
                  results: this.results,
                  errors: this.errors,
                });
                return;
              }
            } finally {
              this.running--;
              next(); // ⭐ resolve / reject 后立刻补任务
            }
          })();
        }
      };

      next();
    });
  }
}
