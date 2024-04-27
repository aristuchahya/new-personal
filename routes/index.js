const router = require("express").Router();
const multer = require("multer");
const {
  addProject,
  home,
  project,
  contact,
  testimonials,
  deleteBlog,
  editProject,
  editBlogView,
  projectById,
} = require("../controller/projectController");

router.get("/users", (req, res) => {
  res.json({ message: "ok ini dari router" });
});

//route navbar
router.get("/project", project);
router.get("/contact", contact);
router.get("/testimonials", testimonials);

//route CRUD project
const upload = multer({ dest: "uploads/" });
router.post("/", upload.single("image"), addProject);
router.get("/", home);
router.get("/:id", projectById);
router.delete("/project/:id", deleteBlog);
router.post("/edit-project/:id", editProject);
router.get("/edit-project/:id", editBlogView);

module.exports = router;
