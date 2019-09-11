import bcrypt from "bcryptjs";
import User from "../models/user";

const authenticate = (req, res, next) => {
    const token = req.header("x-auth");
    User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch(e => {
            res.status(401).send();
        });
};

// const login = (req, res, next) => {
//     const { email, password } = req.body;
//     User.findOne({
//         email
//     })
//         .then(user => {
//             if (!user) {
//                 res.status(404).send();
//             } else {
//                 return bcrypt
//                     .compare(password, user.password)
//                     .then(res => {
//                         if (res) return Promise.resolve(user);
//                         else return Promise.reject();
//                     })
//                     .catch(() => {
//                         return Promise.reject();
//                     });
//             }
//         })
//         .then(user => {
//             res.send(user);
//         })
//         .catch(err => {
//             res.status(401).send();
//         });
// };

const login = (req, res, next) => {
    const { email, password } = req.body;
    User.findByCredentials(email, password)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(err).send();
        });
};

export { authenticate, login };
