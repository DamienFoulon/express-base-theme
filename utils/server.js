// Utils
import { mongoDisconnect } from './mongodb.js';

export async function disconnectServer(app) {
    try {
        await mongoDisconnect();
        app.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}