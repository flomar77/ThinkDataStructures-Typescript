import MyBetterMap from './MyBetterMap';
import MyLinearMap from './MyLinearMap';
export default class MyHashMap<K, V> extends MyBetterMap<K, V> {
    factor = 1;
    set = (key: K, value: V) => {
        const map = this.chooseMap(key);
        map.set(key, value);
        if (this.sumLinearMapEntries() > this.maps.length * this.factor) {
            this.rehash();
        }
        return this;
    };
    rehash = () => {
        const oldMaps = this.maps;
        this.extendMapsLength(oldMaps.length * 2);
        this.restructureMapsEntries(oldMaps);
    };
    extendMapsLength = (newLength: number) => {
        const newMaps: MyLinearMap<K, V>[] = [];
        for (let i = 0; i < newLength; i++) {
            newMaps[i] = new MyLinearMap<K, V>();
        }

        this.maps = newMaps;
    };
    restructureMapsEntries = (oldMaps: MyLinearMap<K, V>[]) => {
        for (const maps of oldMaps) {
            for (const map of maps.myEntries) {
                if (map.key !== undefined && map.value !== undefined) {
                    const targetMap = this.chooseMap(map.key);
                    targetMap.set(map.key, map.value);
                }
            }
        }
    };
}
