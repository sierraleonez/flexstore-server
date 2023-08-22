import { iUserController, iUsersService, req, res } from "../../types";
import { sign } from 'jsonwebtoken'

export default class User implements iUserController{
    _service: iUsersService
    constructor(service: iUsersService) {
        this._service = service
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }

    async register(req: req, res: res) {
        const { username, email, password } = req.body

        await this._service.createUser({ username, email, password, role: "USER" })
        
        res.send({
            status: 'success',
            message: 'User registered'
        })
    }

    async login(req: req, res: res) {
        const { email, password } = req.body

        const user = await this._service.authenticateUser({ email, password })
        const token = sign({ user }, "thewalkerkey")

        res.send({
            status: 'success',
            message: 'login success',
            data: {
                token
            }
        })
        
    }
}