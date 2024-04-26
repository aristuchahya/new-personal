const express = require("express");
const app = express();

const port = 5000;
const path = require("path");
const multer = require("multer");
const moment = require("moment");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.urlencoded({ extended: true }));

// routes

app.get("/", home);

app.get("/project", project);
app.delete("/project/:id", deleteBlog);

app.get("/edit-project/:id", editBlogView);

app.get("/contact", contact);
app.get("/testimonials", testimonial);

const data = [];

// service
function home(req, res) {
  res.render("index", { data });
}

function project(req, res) {
  res.render("project");
}

function formatDateId(date) {
  return moment(date).format("DD/MM/YYYY");
}
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

let lastId = 0;
const upload = multer({ dest: "uploads/" });
app.post("/", upload.single("image"), addProject);
function addProject(req, res) {
  const {
    id: id = ++lastId,
    project,
    start,
    end,
    technology,
    description,
  } = req.body;

  const formattedStart = formatDateId(start);
  const formattedEnd = formatDateId(end);

  const duration = calculateDuration(start, end);

  data.unshift({
    id,
    project,
    start: formattedStart,
    end: formattedEnd,
    duration,
    technology: Array.isArray(technology) ? technology : [technology],
    description,
    image: req.file.filename,
  });

  console.log("list data", data);

  res.redirect("/");
}

function deleteBlog(req, res) {
  const { id } = req.params;
  data.splice(id, 1);
  res.redirect("project");
}

app.get("/:id", (req, res) => {
  const { id } = req.params;
  let project;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      project = data[i];
    }
  }

  res.render("blog-detail", { data: project });
});

function editBlogView(req, res) {
  const { id } = req.params;
  let project;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      project = data[i];
    }
  }

  res.render("edit-project", { data: project });
}

app.post("/edit-project/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { project, start, end, technology, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const formattedStart = formatDateId(start);
  const formattedEnd = formatDateId(end);

  const duration = calculateDuration(start, end);

  const projectIndex = data.findIndex((item) => item.id === Number(id));
  if (projectIndex !== -1) {
    data[projectIndex] = {
      ...data[projectIndex],
      project,
      start: formattedStart,
      end: formattedEnd,
      duration,
      technology: Array.isArray(technology) ? technology : [technology],
      description,
      image,
    };
    console.log(data[projectIndex]);
    res.redirect("/");
  } else {
    res.status(404).send("Project not found");
  }
});

function contact(req, res) {
  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonials");
}

app.listen(port, () => {
  console.log("Server running on port :", port);
});
