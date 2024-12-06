export function search(
  dataSource: Array<any>,
  filter: string,
  config: { keys: Array<string> }
) {
  const { keys } = config;

  if (!filter.trim()) {
    return dataSource; // Return all data if filter is empty
  }

  const lowerCaseFilter = filter.toLowerCase();

  return dataSource.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      if (typeof value === "string" || typeof value === "number") {
        return value.toString().toLowerCase().includes(lowerCaseFilter);
      }
      return false;
    })
  );
}
