// node --test
// node --test --test-name-pattern="add" calculator.test.mjs
// you can also skip, or mark tests as todo if theyre sporadic

// import node:test
import test from 'node:test'
import assert from 'node:assert'

import {add} from './calculator.mjs'

// organize tests with subtests

test('add',async(t)=>{
    // now we create first test as a subtest

    await t.test('add integers',()=>{
        assert.strictEqual(add(1,2),3);
        assert.strictEqual(add(2,3),5);
    } );

    await t.test('add strings', {skip:true} ,() => {
        assert.strictEqual(add('1', '2'), 3);
    });

})