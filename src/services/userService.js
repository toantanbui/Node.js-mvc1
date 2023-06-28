import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.Users.findOne({
                    where: { email: email },
                    raw: true,
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName']

                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'sai mat khau';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = ' User khong duoc tim thay'
                }


            } else {
                userData.errCode = 1;
                userData.errMessage = 'email khong ton tai'

            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }

    })

}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);

        }

    })

}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.Users.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }


            resolve(users)

        } catch (e) {
            reject(e)
        }
    })

}

let CreateNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email da ton tai'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.positionId
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Users.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: " user khong ton tai"
            })
        }
        await db.Users.destroy({
            where: { id: userId }
        });
        resolve({
            errCode: 0,
            message: 'user da xoa'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    message: 'thieu tham so '
                })
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber

                await user.save({

                });
                resolve({
                    errCode: 0,
                    message: 'cap nhat thanh cong'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'User khong tim thay'
                })
            }


        } catch (e) {

        }
    })
}

let getAllCodeService = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'thieu tham so'
                })

            } else {


                let res = {};
                let allcode = await db.Allcodes.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);

            }


        } catch (e) {

            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin, checkUserEmail, getAllUsers, CreateNewUser, deleteUser, updateUserData, getAllCodeService
}