export function extractNames(data: any, title?: string) {
  return data?.map(
    (item: { name: string; id: string | number; title: string }) =>
      title ? item?.title : item?.name
  );
}

export function getIdsByName(array: any, key: number | string, name: string) {
  return array
    ?.filter((obj: { [x: string]: string }) => obj[key] === name)
    ?.map((obj: { id: any }) => obj.id);
}
