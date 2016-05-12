import test from 'ava';
import offsetLines from '../index';
import {SourceMapConsumer} from 'source-map';
import * as conv from 'convert-source-map';
import * as fs from 'fs';
import * as path from 'path';

const code = fs.readFileSync(path.join(__dirname, 'fixtures', 'compiled-with-babel.js'), 'utf-8');
const originalMap = conv.fromSource(code).toObject();
const targetLine = {
    source: 'entry.js',
    line: 3
};
const offsettedMap = offsetLines(originalMap, 15);

test('some invalid mapping in upstream sourcemap', t => {
    const consumer = new SourceMapConsumer(originalMap);
    const invalidMappings = [];
    consumer.eachMapping((m) => {
        if (m.source === null && m.originalLine === null && m.originalColumn === null) {
            invalidMappings.push(m);
        }
    });
    t.ok(0 < invalidMappings.length);
});

test('generated positions in originalMap', t => {
    const consumer = new SourceMapConsumer(originalMap);
    const generated = consumer.allGeneratedPositionsFor(targetLine);
    t.same(generated, [
        { line: 12, column: 0, lastColumn: null },
        { line: 12, column: 17, lastColumn: null },
        { line: 12, column: 24, lastColumn: null },
        { line: 12, column: 13, lastColumn: null },
        { line: 12, column: 20, lastColumn: null }
    ]);
});

test('generated positions in offsetted SourceMap', t => {
    const consumer = new SourceMapConsumer(offsettedMap);
    const generated = consumer.allGeneratedPositionsFor(targetLine);
    t.same(generated, [
        { line: 27, column: 0, lastColumn: null },
        { line: 27, column: 17, lastColumn: null },
        { line: 27, column: 24, lastColumn: null },
        { line: 27, column: 13, lastColumn: null },
        { line: 27, column: 20, lastColumn: null }
    ]);
});

test(`property [mappings] should be changed`, t => {
    t.notSame(originalMap.mappings, offsettedMap.mappings);
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
        t.same(originalMap[propName], offsettedMap[propName]);
    });
}
