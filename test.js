const dbtest = require('./tests/db');

(async () => {

    const status = await dbtest();


    process.exit();

})()