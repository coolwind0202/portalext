const getLectureURL = (day, hour) => `${document.URL}-IBehaviorListener.0-timetablePanel-content-timetableAxisListView-${hour}-timetableBeanListList-${day}-course-0-lectureLink`;

const attachHrefToTds = () => {
  const rows = document.querySelectorAll("table > tbody > tr");
  const cells = [...rows].map(tr => [...tr.children].slice(1));

  cells.forEach((tr, x) => {
    tr.forEach((td, y) => {
      const a = td.querySelector("div > a");
      if (a != null) a.href = getLectureURL(y, x);
    });
  });
}

setTimeout(attachHrefToTds, 1000);