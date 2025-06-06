// node --test --test-reporter=tap

import * as assert from 'node:assert';
import {test} from 'node:test';
import { getGitHubUser } from './github.mjs';

import sinon from 'sinon'
// for stubbing - to not have to make http calls
// 

test('Get Github user by username', async(t)=>{
    // const githubUser=await getGitHubUser('wycats');
    // console.log(githubUser)
    const fakeResponse=Promise.resolve({
        json:()=>Promise.resolve({
            login:'wycats'
        })
    })

    sinon.stub(global, 'fetch').returns(fakeResponse);
    const githubUser=await getGitHubUser('wycats');
    sinon.restore();

    assert.strictEqual(githubUser.login, 'wycats')

})