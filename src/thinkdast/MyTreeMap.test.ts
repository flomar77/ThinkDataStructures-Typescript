import MyTreeMap from './MyTreeMap';
import { expect, test, beforeEach } from 'vitest';

const map = new MyTreeMap<string, number>();
const root = map.makeNode('03', 3);
const one = map.makeNode('01', 1);
const five = map.makeNode('05', 5);
const two = map.makeNode('02', 2);
const seven = map.makeNode('07', 7);
const fifteen = map.makeNode('15', 15);
const ten = map.makeNode('10', 10);
/*
    3
   |  |
   2  10
 | |  | |
 1 5  7 15
 */
beforeEach(() => {
    two.leftNode = one;
    two.rightNode = five;
    ten.leftNode = seven;
    ten.rightNode = fifteen;
    root.leftNode = two;
    root.rightNode = ten;
});
// test('No root node throws error', () => {
//     const emptyMap = new MyTreeMap<string, number>();
//     expect(emptyMap.findNode('10')).toThrow(new Error('Map has no root node.'));
// });
test('find node anywhere', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);

    expect(map.findNode('10')).toBe(ten);
    expect(map.findNode('02')).toBe(two);
    expect(map.findNode('20')).toBe(null);
});
test('clear', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    map.clear();
    expect(map.size).toBe(0);
    expect(map.root).toBe(undefined);
});
test('contains key', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    expect(map.containsKey('01')).toBe(true);
    expect(map.containsKey('None')).toBe(false);
});

test('contains value', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    expect(map.containsValue(15)).toBe(true);
    expect(map.containsValue(17)).toBe(false);
});

test('contains get', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    expect(map.get('15')).toBe(15);
    expect(map.get('02')).toBe(2);
});
test('sort', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    const expected = new Set(['01', '02', '03', '05', '07', '10', '15']);
    expect(map.sortedKeys()).toEqual(expected);
});
test('put', () => {
    const map = new MyTreeMap<string, number>();
    map.setTree(root, 7);
    map.add('11', 11);
    expect(map.size).toBe(8);
    expect(map.get('11')).toBe(11);
    map.add('06', 6);
    expect(map.size).toBe(9);
    expect(map.get('06')).toBe(6);

    map.remove('11', 11);
    expect(map.findNode('11')).toBe(null);
    map.remove('06', 6);
    expect(map.findNode('06')).toBe(null);
});
