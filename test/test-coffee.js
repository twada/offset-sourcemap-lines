import test from 'ava';
import offsetLines from '../index';
import {SourceMapConsumer} from 'source-map';
import * as conv from 'convert-source-map';
import * as fs from 'fs';
import * as path from 'path';

const code = fs.readFileSync(path.join(__dirname, 'fixtures', 'compiled-with-coffee.js'), 'utf-8');
const originalMap = conv.fromSource(code).toObject();
const targetPosition = {
    source: '/absolute/path/to/coffee_script_test.coffee',
    line: 33,
    column: 4
};
const offsettedMap = offsetLines(originalMap, 15);

test('generated positions in originalMap', t => {
    const consumer = new SourceMapConsumer(originalMap);
    const generated = consumer.allGeneratedPositionsFor(targetPosition);
    t.deepEqual(generated, [
        { line: 27, column: 11, lastColumn: null },
        { line: 27, column: 17, lastColumn: null },
        { line: 27, column: 53, lastColumn: null }
    ]);
});

test('generated positions in offsetted SourceMap', t => {
    const consumer = new SourceMapConsumer(offsettedMap);
    const generated = consumer.allGeneratedPositionsFor(targetPosition);
    t.deepEqual(generated, [
        { line: 42, column: 11, lastColumn: null },
        { line: 42, column: 17, lastColumn: null },
        { line: 42, column: 53, lastColumn: null }
    ]);
});

test(`property [mappings] should be changed`, t => {
    t.notDeepEqual(originalMap.mappings, offsettedMap.mappings);
});

const unchangedProps = [
    'version',
    'file',
    'sourceRoot',
    'sources',
    'names',
    'sourcesContent'
];
for (let propName of unchangedProps) {
    test(`property [${propName}] should not be changed`, t => {
        t.deepEqual(originalMap[propName], offsettedMap[propName]);
    });
}
