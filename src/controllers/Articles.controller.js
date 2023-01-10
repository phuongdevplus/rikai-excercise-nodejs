import { ArticlesSchema } from "../schemas/Articles.schemas.js";
import { that } from '../middlewares/Upload.model.js'
export const ArticlesController = {
  get(req, res, next) {
    ArticlesSchema.find({})
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "get data post successfully",
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
  getOne(req, res, next) {
    const id = req.params.id;
    ArticlesSchema.find({ _id: id })
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "get data successfully",
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
    if (file) {
      that.uploadFileDriver({ shared: true }, file)
        .then(result => {
          const formData = {
            ...body,
            UserId: req?.params.id,
            Images: result.data.webContentLink
          }
          const courses = new ArticlesSchema(formData)
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
        UserId: req?.params.id,
        Images: '',
      }
      const courses = new ArticlesSchema(formData)
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
    ArticlesSchema.deleteOne({ _id: req.params.id })
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
            Images: result.data.webContentLink
          }
          ArticlesSchema.updateOne({ _id: req.params.id }, formData)
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
      ArticlesSchema.updateOne({ _id: req.params.id }, body)
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
