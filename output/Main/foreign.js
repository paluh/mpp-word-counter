export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function matchAllImpl(regex, str) {
  var res = [];
  for(const m of str.matchAll(regex)) {
    res.push(m.groups);
  }
  return res;
}
