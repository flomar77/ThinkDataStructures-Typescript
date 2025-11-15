export default class Profiler {
    name?: string;
    startTime = performance.now();
    endTime = performance.now();
    start = (name?: string) => {
        if (name) {
            this.name = name;
        }
        this.startTime = performance.now();
    };
    end = () => {
        this.endTime = performance.now();
        this.log();
    };
    log = () => {
        const diff = this.endTime - this.startTime;
        console.log(diff);
        console.log(`${this.name ? this.name : 'It'} took ${diff} ms`);
    };
}
