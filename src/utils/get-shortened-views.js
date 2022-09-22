export const getShortenedViewsFunction = (views) => {
  if (views <= 999) {
    return(views);
  }

  if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(1).replace(".0", "") + "K";
  }

	if (views >= 1000000 && views < 1000000000) {
    return (views / 1000000).toFixed(1).replace(".0", "") + "M";
  }

	if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1).replace(".0", "") + "B";
  }
}