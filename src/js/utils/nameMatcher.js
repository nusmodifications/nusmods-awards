export default function nameMatcher(name, searchTerm) {
  function normalize(str) {
    return str.replace(/\W/g, '').toLowerCase();
  }
  const normalizedName = normalize(name);
  const normalizedSearchTerm = normalize(searchTerm);
  return normalizedName.indexOf(normalizedSearchTerm) > -1;
}
