const moment = require("moment");

const data = [];

const home = (req, res) => {
  res.render("index", { data });
};

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

const addProject = (req, res) => {
  const {
    id: id = ++lastId,
    title,
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
    title,
    start: formattedStart,
    end: formattedEnd,
    duration,
    technology: Array.isArray(technology) ? technology : [technology],
    description,
    image: req.file.filename,
  });

  console.log("list data", data);

  res.redirect("/");
};

const deleteBlog = (req, res) => {
  const { id } = req.params;
  data.splice(id, 1);
  res.redirect("project");
};

const projectById = (req, res) => {
  const { id } = req.params;
  let project;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      project = data[i];
    }
  }

  res.render("blog-detail", { data: project });
};

const editProject = (req, res) => {
  const { id } = req.params;
  const { title, start, end, technology, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const formattedStart = formatDateId(start);
  const formattedEnd = formatDateId(end);

  const duration = calculateDuration(start, end);

  const projectIndex = data.findIndex((item) => item.id === Number(id));
  if (projectIndex !== -1) {
    data[projectIndex] = {
      ...data[projectIndex],
      title,
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
};

const editBlogView = (req, res) => {
  const { id } = req.params;
  let project;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      project = data[i];
    }
  }

  res.render("edit-project", { data: project });
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

module.exports = {
  addProject,
  home,
  project,
  contact,
  testimonials,
  deleteBlog,
  projectById,
  editProject,
  editBlogView,
};
