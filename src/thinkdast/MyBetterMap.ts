import MyLinearMap from './MyLinearMap';
export default class MyBetterMap<K, V> extends Map<K, V> {
    maps: MyLinearMap<K, V>[] = [];
    length: number = 0;
    size: number = 0;
    makeMaps(n: number) {
        for (let i = 0; i++; i < n - 1) {
            this.maps[i] = new MyLinearMap<K, V>();
        }
    }
    clear() {
        this.maps = [];
        this.size = 0;
    }
    containsKey(key: K): boolean {
        const map = this.chooseMap(key);
        return map.containsKey(key);
    }
    containsValue(value: V) {
        for (const map of this.maps) {
            if (map.containsValue(value)) {
                return true;
            }
        }
        return false;
    }
    delete(key: K) {
        const map = this.chooseMap(key);
        this.size = this.size--;
        console.log(this.size);
        return map.delete(key);
    }
    set(key: K, value: V): this {
        const map = this.chooseMap(key);
        map.set(key, value);
        this.size++;
        console.log(this.size);
        return this;
    }
    chooseMap(key: K): MyLinearMap<K, V> {
        let index = 0;
        if (typeof key === 'string' && this.maps.length > 0) {
            key.toString()
                .split('')
                .forEach((_, idx) => {
                    index += key.toString().charCodeAt(idx);
                });
            index = Math.abs(index) % this.maps.length;
        }
        if (this.maps[index] === undefined) {
            this.maps[index] = new MyLinearMap();
        }
        return this.maps[index];
    }
    sumLinearMapEntries(): number {
        const sum = this.maps.reduce((acc, it) => {
            return (acc += it.myEntries.length);
        }, 0);
        console.log(`sumLinearMapEntries: ${sum}`);
        return sum;
    }
}
