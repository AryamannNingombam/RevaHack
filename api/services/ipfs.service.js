const {
    create
} = require('ipfs-http-client')


exports.UploadOnIPFS = async (body) => {
    const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
    })
    const data = new Buffer(body, 'base64')
    const hash = await ipfs.add(data)
    const response = {
        statusCode: 200,
        body: JSON.stringify(hash["path"]),
    };
    return response;
};