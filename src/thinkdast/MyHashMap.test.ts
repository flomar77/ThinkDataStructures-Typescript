import MyHashMap from './MyHashMap';
import { expect, test, beforeEach } from 'vitest';

const map = new MyHashMap<string, number>();

beforeEach(() => {
    map.set('One', 1)
        .set('Two', 2)
        .set('Three', 3)
        .set('Thousand hundred twenty five', 1125)
        .set('Thousand hundred twenty six', 1126);
});

test('clear', () => {
    expect(map.maps.length).toBe(8);
    map.clear();
    expect(map.maps.length).toBe(0);
});

test('contains key', () => {
    expect(map.containsKey('One')).toBe(true);
    expect(map.containsKey('None')).toBe(false);
});

test('contains value', () => {
    expect(map.containsValue(1)).toBe(true);
    expect(map.containsValue(12)).toBe(false);
});

test('remove key', () => {
    map.delete('One');
    expect(map.containsKey('One')).toBe(false);
});

// etc...
