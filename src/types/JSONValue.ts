export type JSONValue =
  null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
