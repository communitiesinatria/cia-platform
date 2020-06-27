const dbtest = require('./tests/db');

(async () => {

    await dbtest();


    process.exit();

})()