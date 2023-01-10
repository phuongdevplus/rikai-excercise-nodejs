import { AuthorsSchema } from "../schemas/Authors.schemas.js";
import { that } from '../middlewares/Upload.model.js'

export const AuthorsController = {
  get(req, res, next) {
    AuthorsSchema.find({})
      .then((data) => {
        console.log('data',data)
        res.status(200).json({
          statusCode: 200,
          message: "get data user successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: `Can't get.`,
        }));
  },
  upload(req, res, next) {
    const { body, file } = req
    console.log(body, file)
    if (file) {
      that.uploadFileDriver({ shared: true }, file)
        .then(result => {
          const formData = {
            ...body,
            Avatar: result.data.webContentLink
          }
          const courses = new AuthorsSchema(formData)
          courses.save()
            .then((data) => {
              res.status(200).json({
                statusCode: 200,
                message: "upload data successfully",
                data: data,
                success: true,
              })
            })
            .catch(() =>
              res.status(404).json({
                success: false,
                message: `Can't upload.`,
              }));
        })
    } else {
      const formData = {
        ...body,
        Avatar: ''
      }
      const courses = new AuthorsSchema(formData)
      courses.save()
        .then((data) => {
          res.status(200).json({
            statusCode: 200,
            message: "upload data successfully",
            data: data,
            success: true,
          })
        })
        .catch(() =>
          res.status(404).json({
            success: false,
            message: `Can't upload.`,
          }));
    }

  },
  delete(req, res) {
    console.log(req.params.id);
    AuthorsSchema.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "delete data successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: `Can't find id: ${req.params.id}.`,
        }));
  },
  update(req, res, next) {
    const { file, body } = req
    console.log(body, file)
    if (file) {
      that.uploadFileDriver({ shared: true }, file)
        .then(result => {
          const formData = {
            ...body,
            Avatar: result.data.webContentLink
          }
          AuthorsSchema.updateOne({ _id: req.params.id }, formData)
            .then((data) => {
              res.status(200).json({
                statusCode: 200,
                message: "update data successfully",
                data: data,
                success: true,
              })
            })
            .catch(() =>
              res.status(404).json({
                success: false,
                message: `Can't find id: ${req.params.id}.`,
              }));
        })
    } else {
      AuthorsSchema.updateOne({ _id: req.params.id }, body)
        .then((data) => {
          res.status(200).json({
            statusCode: 200,
            message: "update data successfully",
            data: data,
            success: true,
          })
        })
        .catch(() =>
          res.status(404).json({
            success: false,
            message: `Can't find id: ${req.params.id}.`,
          }));
    }
  },
};
