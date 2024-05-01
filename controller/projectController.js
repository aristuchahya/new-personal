const moment = require("moment");
const config = require("../config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");

// const data = [];
const { Project } = require("../models");
const { User } = require("../models");

function calculateDuration(startDate, endDate) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const duration = moment.duration(endMoment.diff(startMoment));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  if (years > 0) {
    return `${years} Year`;
  } else if (months > 0) {
    return `${months} Month`;
  } else {
    return `${days} Day`;
  }
}

const allProject = async (req, res) => {
  // const query = "SELECT * FROM Projects";
  // const projects = await sequelize.query(query, { type: QueryTypes.SELECT });

  const projects = await Project.findAll();

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  console.log("isLogin :", isLogin);
  console.log("user :", user);

  res.render("index", { projects, isLogin, user });
};

const findProject = async (req, res) => {
  try {
    const { id } = req.params;
    // const query = `SELECT * FROM Projects WHERE id = ${id}`;
    // const data = await sequelize.query(query, { type: QueryTypes.SELECT });
    const data = await Project.findOne({ where: { id } });
    const technoArray = data.technology.split(",");

    res.render("blog-detail", {
      data: {
        ...data.dataValues,

        technology: technoArray,
      },
    });

    console.log("project by id", data);
  } catch (error) {
    console.log(error, "Data Not Found");
  }
};

const addProject = async (req, res) => {
  const { title, startDate, endDate, technology, description } = req.body;
  const formatTechno = technology.join(",");
  const duration = calculateDuration(startDate, endDate);
  // const query = `INSERT INTO Projects (title,startDate,endDate,duration,technology,description) VALUES ('${title}','${startDate}','${endDate}','${duration}','${formatTechno}','${description}');`;
  // const data = await sequelize.query(query, { type: QueryTypes.INSERT});

  const data = await Project.create({
    title,
    startDate,
    endDate,
    duration,
    technology: formatTechno,
    description,
    image:
      "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  res.redirect("/");
  console.log("input data", data);
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Project.destroy({ where: { id } });

    res.redirect("/");
  } catch (error) {
    console.log(error, "Data Cant Deleted");
  }
};

const updateProject = async (req, res) => {
  const { title, startDate, endDate, technology, description, id } = req.body;

  const technoFormat = technology.join(",");
  const duration = calculateDuration(startDate, endDate);
  // const query = `UPDATE Projects SET title = '${title}',startDate = '${startDate}',endDate = '${endDate}',duration = '${duration}',technology = '${technoFormat}',description = '${description}' WHERE id = ${id};`;
  // const data = await sequelize.query(query, { type: QueryTypes.UPDATE });
  const data = await Project.update(
    {
      title,
      startDate,
      endDate,
      technology: technoFormat,
      description,
      duration,
    },
    { where: { id } }
  );
  res.redirect("/");
  console.log("update data", { data });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  // const query = `INSERT INTO Users (name,email,password) VALUES ('${name}','${email}','${hashedPassword}');`;
  // const data = await sequelize.query(query, { type: QueryTypes.INSERT });

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.redirect("/login");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // const query = `SELECT * FROM Users WHERE email = '${email}';`;
  // const user = await sequelize.query(query, { type: QueryTypes.SELECT });

  const user = await User.findOne({ where: { email } });

  if (!user) {
    req.flash("danger", "Email not found");
    return res.redirect("/login");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    req.flash("danger", "Password wrong");
    return res.redirect("/login");
  }

  req.session.isLogin = true;
  req.session.user = {
    name: user.name,
    email: user.email,
  };

  req.flash("success", "Login Successful");
  res.redirect("/");
};

const logout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) return console.error("Logout Failed");

    console.log("Logout Success");
    res.redirect("/login");
  });
};

const editView = async (req, res) => {
  const { id } = req.params;

  const data = await Project.findOne({
    where: { id },
  });
  const isLogin = req.session.isLogin;
  console.log("Data found", data);

  res.render("edit-project", { data });
};

const project = (req, res) => {
  res.render("project");
};

const contact = (req, res) => {
  res.render("contact");
};

const testimonials = (req, res) => {
  res.render("testimonials");
};

const registerView = (req, res) => {
  res.render("register");
};

const loginView = (req, res) => {
  res.render("login");
};

module.exports = {
  addProject,
  allProject,
  project,
  contact,
  testimonials,
  registerView,
  loginView,
  register,
  login,
  findProject,
  deleteProject,
  updateProject,
  editView,
  logout,
};
