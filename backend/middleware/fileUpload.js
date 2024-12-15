import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(path.resolve(), '/uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});

const fileFilter = (req, file, cb) => {
    const allowedType = ['image/jpg','image/png','image/jpeg']
    if(allowedType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('only images are allowed'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
});


export {upload}