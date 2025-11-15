import { createClient } from 'redis';

export default async function testRedis() {
    const client = await createClient().on('error', (err: Error) =>
        console.log('Redis Client Error', err)
    );
    client.connect();

    await client.set('key 1', 'value 1');
    const value = await client.get('key 1');
    console.log(value);

    client.destroy();
}
