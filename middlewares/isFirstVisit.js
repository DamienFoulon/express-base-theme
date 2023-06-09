// Utils
import {
    mongoConnect,
    mongoDisconnect,
    mongoCreateOne,
    mongoFindOne,
} from '../utils/mongodb.js';
import {ObjectId} from "mongodb";

export async function isFirstVisitMiddleware(req, res, next) {
    try {
        const isFirstVisit = req.cookies.isFirstVisit;
        if(!isFirstVisit) {
            const user = {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                date: new Date(),
            }
            await mongoCreateOne('users', user);
            res.cookie('isFirstVisit', false, { httpOnly: true });
            res.cookie('user', user, { httpOnly: true });
        } else {
            const user = await mongoFindOne('users', { _id: new ObjectId(req.cookies.user._id) });
            if(!user) {
                res.sendStatus(404)
                return;
            }
            res.locals.user = user;
        }
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
    next();
}