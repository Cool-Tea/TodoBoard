export const dbPath = 'src/database'

export function mapToJson(map: Map<string, any>) {
  const json: { [key: string]: any } = {};
  map.forEach((v, k) => {
    json[k.toString()] = v;
  });
  return JSON.stringify(json);
}

export function jsonToMap(jsonStr: string) {
  const json = JSON.parse(jsonStr);
  const map = new Map<string, any>();
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      map.set(key, json[key]);
    }
  }
  return map;
}