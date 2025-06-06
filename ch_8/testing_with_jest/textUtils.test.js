// npm test
// testing_with_jest % ./node_modules/jest/bin/jest.js --coverage

const {lowercase,uppercase,captitalize} = require('./textUtils');

// jest describe block
describe('textUtils', ()=>{

    // beforeAll
    // beforeEach
    // afterEach
    // afterAll

    test('converts "HELLO WORLD" to all lowercase',()=>{
        expect(lowercase('HELLO WORLD') ).toBe('hello world')
    });

    test('converts "hello world" to all uppercase ', ()=>{
        expect(uppercase('hello world')).toBe('HELLO WORLD')
    } )

    function fetchDataCallback(callback){
        
        setTimeout( ()=>{
            callback('hello')
        },1000 );
    }

    test('the data is hello',done=>{
        function callback(data){
            try{
                expect(data).toBe('hello');
                done();
            }catch(error){
                done(error) // done is called once the callback recives data
                // 
            }
        }
        fetchDataCallback(callback)
    })

})