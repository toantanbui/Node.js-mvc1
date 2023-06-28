import express from "express";
import homController from "../controllers/homeController"
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homController.getHomePage);
    router.get('/about', homController.getAboutPage)
    router.get('/hoidanit', (req, res) => {
        return res.send('Hello world with Toan')
    });
    router.get('/crud', homController.getCRUD);
    router.post('/post-crud', homController.postCRUD);
    router.get('/get-crud', homController.displayGetCRUD);
    router.get('/edit-crud', homController.getEditCRUD);
    router.post('/put-crud', homController.putCRUD);
    router.get('/delete-crud', homController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    return app.use("/", router);
}

module.exports = initWebRoutes;