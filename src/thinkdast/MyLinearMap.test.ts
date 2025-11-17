import MyLinearMap from './MyBetterMap';
import { expect, test, beforeEach } from 'vitest';
import Profiler from './Profiler';

const map = new MyLinearMap<string, number>();
const profiler = new Profiler();
const setItems = async () => {
    map.set('One', 1).set('Two', 2).set('Three', 3);
};
beforeEach(async () => {
    await setItems();
});

test('clear', () => {
    expect(map.size).toBe(3);
    map.clear();
    expect(map.size).toBe(0);
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
    map.set('Four', 4);
    profiler.end();
});

// etc...
