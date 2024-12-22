// __tests__/linkModel.test.js
const { Sequelize } = require('sequelize');
const LinkModel = require('../../models/link');

const sequelizeMock = new Sequelize('sqlite::memory:');

describe('Link Model', () => {
    let Link;

    beforeAll(() => {
        Link = LinkModel(sequelizeMock);
    });

    test('should create a link with valid data', async () => {
        const link = await Link.create({
            videoId: 1,
            token: '123456789',
            expiry: new Date(),
        });

        expect(link.videoId).toBe(1);
        expect(link.token).toBe('123456789');
    });
});
