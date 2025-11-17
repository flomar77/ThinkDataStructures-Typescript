/**
 * Implementation of a Map using a List of entries, so most
 * operations are linear time.
 *
 */
export class Entry<K, V> {
    key: K | undefined;
    value: V | undefined;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
    getKey = (): K | undefined => {
        return this.key;
    };
    getValue = (): V | undefined => {
        return this.value;
    };
    setValue = (newValue: V) => {
        this.value = newValue;
        return this.value;
    };
}

export default class MyLinearMap<K, V> extends Map<K, V> {
    myEntries: Entry<K, V>[] = [];
    clear = () => {
        this.myEntries = [];
    };

    delete = (key: K): boolean => {
        let deleted = false;
        const exists = this.findEntry(key);
        if (exists) {
            const index = this.myEntries.indexOf(exists);
            this.myEntries.splice(index, 1);
            deleted = true;
        }
        return deleted;
    };

    set = (key: K, value: V): this => {
        this.delete(key);
        const newEntry = new Entry(key, value);
        this.myEntries.push(newEntry);
        return this;
    };

    containsKey = (target: K): boolean => {
        return this.findEntry(target) !== undefined;
    };

    /**
     * Returns the entry that contains the target key, or null if there is none.
     */
    findEntry = (key: K | undefined): Entry<K, V> | undefined => {
        for (const entry of this.myEntries) {
            if (entry.key === key) return entry;
        }
        return undefined;
    };

    /**
     * Compares two keys or two values, handling null correctly.
     */
    equals = (target: K | V | undefined, obj: K | V | undefined): boolean => {
        if (target == null) {
            return obj == null;
        }
        return target === obj;
    };

    containsValue = (target: V) => {
        for (const entry of this.myEntries) {
            if (this.equals(target, entry.getValue())) {
                return true;
            }
        }
        return false;
    };
}
