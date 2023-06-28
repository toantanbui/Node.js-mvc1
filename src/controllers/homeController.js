
import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll();
        console.log('gt data la ', data)
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}


let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render('test/displayCRUD.ejs', {
        dataTable: data
    })
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);

    return res.send('postCRUD')

}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);

        return res.render('test/editCRUD.ejs', {
            user: userData
        })
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.send('ok');
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {


        await CRUDService.deleteUserById(id)
        return res.send('xoa thanh cong')
    }
    else {
        return res.send('khong thanh cong')
    }

}



module.exports = {
    getHomePage, getAboutPage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, deleteCRUD
}