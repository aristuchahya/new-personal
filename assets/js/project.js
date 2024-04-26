async function deletePost(index) {
  await fetch(`http://localhost:5000/project/${index}`, {
    method: "DELETE",
  });
}
