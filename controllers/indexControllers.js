export async function indexController(req, res) {
    req.log.info('Index route accessed');
    res.json(res.locals.user)
}