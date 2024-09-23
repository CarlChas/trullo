import { Router } from 'express'
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController'

const router = Router()

router.post('/', (req, res) => {
    console.log('POST /users route hit');
    createUser(req, res);
})
router.get('/', (req, res) => {
    console.log('GET /users route hit')
    getUsers(req, res);
})
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router