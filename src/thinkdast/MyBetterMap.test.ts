import MyBetterMap from './MyBetterMap';
import { expect, test, beforeEach } from 'vitest';

const map = new MyBetterMap<string, number>();

beforeEach(() => {
    map.mySet('One', 1);
    map.mySet('Two', 2);
    map.mySet('Three', 3);
});

test('clear', () => {
    expect(map.maps.length).toBe(1);
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
