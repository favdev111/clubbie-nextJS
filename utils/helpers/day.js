const now = new Date();
let dd = now.getDate();
let mm = now.getMonth() + 1;
let yyyy = now.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

export const today = yyyy + "-" + mm + "-" + dd;
