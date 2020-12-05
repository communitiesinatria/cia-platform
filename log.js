const Image = require('ascii-art-image');

const logger = {
    serverStart: (state) => {
        const image = new Image({
            // filepath: './backlogo.jpg',
            filepath: './logo.png',
            alphabet: 'bits'
        });

        image.write(function (err, rendered) {
            console.log(rendered);
            if (!state) console.log('-----server started-----\n');
            else console.log('-----server setup for development-----\n');
        })
    }
}

if (process.argv[2] === 'setup') {
    logger.serverStart('setup');
}

module.exports = logger;