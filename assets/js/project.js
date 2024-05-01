async function deletePost(index) {
  await fetch(`http://localhost:5000/project/${index}`, {
    method: "DELETE",
  });
}

async function editPost(id) {
  const response = await fetch(`http://localhost:5000/edit/${id}`, {
    method: "PUT",
  });
}
