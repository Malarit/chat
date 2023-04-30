import { FindOptions, ModelDefined } from "sequelize";

export async function bdFindOne<T extends ModelDefined<any, any>>(
  model: T,
  option:
    | FindOptions<T extends ModelDefined<infer C, any> ? C : any>
    | undefined
): Promise<T extends ModelDefined<infer C, any> ? C : any> {
  const data = await model.findOne(option);
  return data?.get({ plain: true });
}
