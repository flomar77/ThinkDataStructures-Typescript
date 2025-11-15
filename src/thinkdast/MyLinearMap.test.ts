import MyLinearMap from './MyBetterMap';
import { expect, test, beforeEach } from 'vitest';
import Profiler from './Profiler';

const map = new MyLinearMap<string, number>();
const profiler = new Profiler();
beforeEach(() => {
    map.mySet('One', 1).mySet('Two', 2).mySet('Three', 3);
});

test('clear', () => {
    expect(map.length).toBe(1);
    map.clear();
    expect(map.length).toBe(0);
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

test('profile put', () => {
    profiler.start('MyLinearMap put');
    map.mySet('Four', 4);
    profiler.end();
});

// etc...
