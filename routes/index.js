const router = require("express").Router();
const express = require("express");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const session = require("express-session");
const flash = require("express-flash");
// const multer = require("multer");
const {
  project,
  contact,
  testimonials,

  allProject,
  registerView,
  loginView,
  findProject,
  addProject,
  deleteProject,
  updateProject,
  editView,
  register,
  login,
  logout,
} = require("../controller/projectController");

router.use(
  session({
    name: "mysession",
    secret: "missingkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

router.use(flash());

//route navbar
// router.get("/", home);
router.get("/register", registerView);
router.get("/login", loginView);
router.get("/project", project);
router.get("/contact", contact);
router.get("/testimonials", testimonials);

//route CRUD project
// const upload = multer({ dest: "uploads/" });
// router.post("/", upload.single("image"), addProject);
router.get("/", allProject);
router.get("/detail/:id", findProject);
router.post("/", addProject);
router.post("/delete/:id", deleteProject);
router.post("/edit", updateProject);
router.get("/edit/:id", editView);
router.post("/regist", register);
router.post("/login", login);
router.post("/logout", logout);

// router.get("/:id", projectById);
// router.delete("/project/:id", deleteBlog);
// router.post("/edit-project/:id", editProject);
// router.get("/edit-project/:id", editBlogView);

module.exports = router;
