function isValidIcons(icons) {
  return icons.every((icon) => Boolean(icon.properties?.name));
}

export default isValidIcons;
