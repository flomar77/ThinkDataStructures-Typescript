import MyLinearMap from './MyLinearMap';
import MyBetterMap from './MyBetterMap';
import { test, beforeEach } from 'vitest';
import Profiler from './Profiler';
import MyHashMap from './MyHashMap';

const linearMap = new MyLinearMap<string, number>();
const betterMap = new MyBetterMap<string, number>();
const hashMap = new MyHashMap<string, number>();

const multiple = [
    { key: 'One', value: 1 },
    { key: 'Two', value: 2 },
    { key: 'Three', value: 3 },
    { key: 'Four', value: 4 },
    { key: 'Thousand hundred twenty five', value: 1125 },
    { key: 'Thousand hundred twenty six', value: 1126 },
];

beforeEach(() => {
    linearMap.clear();
    betterMap.clear();
    hashMap.clear();
});

test('Profile MyLinearMap put', () => {
    const profiler = new Profiler();
    profiler.start('MyLinearMap put');
    linearMap.mySet('One', 1);
    profiler.end();
});

test('Profile MyBetterMap put', () => {
    const profiler = new Profiler();
    profiler.start('MyBetterMap put');
    betterMap.mySet('One', 1);
    profiler.end();
});

test('Profile MyHashMap put', () => {
    const profiler = new Profiler();
    profiler.start('MyHashMap put');
    hashMap.mySet('One', 1);
    profiler.end();
});

test('Profile All put 1 items', () => {
    const profiler = new Profiler();

    profiler.start('MyLinearMap put');
    linearMap.mySet('One', 1);
    profiler.end();

    profiler.start('MyBetterMap put');
    betterMap.mySet('One', 1);
    profiler.end();

    profiler.start('MyHashMap put');
    hashMap.mySet('One', 1);
    profiler.end();
});

test('Profile All put multiple items', () => {
    const profiler = new Profiler();

    profiler.start('MyLinearMap put 5 items');
    multiple.forEach((it) => linearMap.mySet(it.key, it.value));
    profiler.end();

    profiler.start('MyBetterMap put 5 items');
    multiple.forEach((it) => betterMap.mySet(it.key, it.value));
    profiler.end();

    profiler.start('MyHashMap put 5 items');
    multiple.forEach((it) => hashMap.mySet(it.key, it.value));
    profiler.end();
});
