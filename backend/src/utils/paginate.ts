import { Attributes, FindOptions } from "sequelize";

const paginate = (
  query: FindOptions,
  { page, pageSize }: { page: number; pageSize: number }
) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};
export default paginate;
