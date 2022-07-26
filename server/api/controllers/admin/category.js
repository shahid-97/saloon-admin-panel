/* @Controller category */
const sequelize = require("./../../../config/db.connection");
const Sequelize = require("sequelize");

const Service = require("./../../../models/services")(sequelize, Sequelize);
const path = require("path");
const dirname = require("./../../../dirName");
const Services = require("../../models/services");
const SubServices = require("./../../../models/sub_services")(
  sequelize,
  Sequelize
);
/**
 * @action getCategory()
 *
 * @description to get all category
 */
exports.getCategory = (req, res, next) => {
  /* model association */
  Services.hasMany(SubServices, {
    foreignKey: "service_id",
    targetKey: "id",
  });

  const data = Services.findAll({
    include: {
      model: SubServices,
      required: false,
    },
  });
  data
    .then((result) => {
      res.setHeader("Content-type", "application/json");
      res.send(result );
      res.end();
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

/**
 * @action addCategory()
 *
 * @description add category
 */
exports.addCategory = (req, res, next) => {
  const service_name = req.body.service_name;
  var filePath = "";
  var image_url = "";

  // if (req.files.image) {
  //   var fileMIMEType = "." + req.files.image.mimetype.split("/")[1];
  //   fileName = "image_" + new Date().toISOString() + fileMIMEType;
  //   // fileName = new Date().toISOString() + "-" + service_name + fileMIMEType;
  //   filePath = path.join(dirname, "api/images/services/") + fileName;
  //   image_url = "static/services/" + fileName;
  //   req.files.image
  //     .mv(filePath)
  //     .then((result) => {
  //       console.log("successfully upload file");
  //     })
  //     .catch((err) => {
  //       err.status = 500;
  //       next(err);
  //     });
  // }
  Service.create({
    service_name: service_name,
    image_url: image_url,
  })
    .then((result) => {
      res.json({ status: 201, message: "record added successfully..." });
      res.end();
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
/**
 * @action updateCategory()
 *
 * @description update category
 */
exports.updateCategory = (req, res, next) => {
  // const data = req.body ?? [];
  const id = req.params.id;
  const updateServiceName = req.body.service_name;
  // const image_url = data['image_url'] ?? '';
  // const description = data['description'] ?? '';

  Service.update(
    {
      service_name: updateServiceName,
      // image_url: image_url,
      // description: description
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      if (!result[0]) {
        const err = new Error(
          "either no data changed or no service found to be update!"
        );
        err.httpStatusCode = 404;
        next(err);
      } else {
        res.json({ status: 201, message: "service updated successfully..." });
        res.end();
      }
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
/**
 * @action deletecategory()
 *
 * @description delete specific category
 */
exports.deleteCategory = (req, res, next) => {
  const id = req.params.id;
  Service.destroy({ where: { id: id } })
    .then((rowDeleted) => {
      if (rowDeleted == 1) {
        res.json({ status: 200, message: "service deleted successfully..." });
        res.end();
      } else {
        const err = new Error("no service found to be delete!");
        err.httpStatusCode = 404;
        next(err);
      }
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
/**
 * @action deleteAllcategorys()
 *
 * @description delete all categorys
 */
exports.deleteAllCategory = (req, res, next) => {
  const id = req.params.id;
  Category.destroy({
    truncate: true,
  })
    .then((result) => {
      // console.log('all categorys deleted...')
      // res.send('all category deleted...')
      // res.end()
      res.json({
        status: 200,
        message: "all services deleted successfully...",
      });
      res.end();
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
