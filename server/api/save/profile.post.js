import UserModel from "~~/server/models/User";
export default defineEventHandler(async event => {
  const body = await readBody(event)
  const res = {}
  let result1;
  try {
    const filter = { _id: body._id }
    const update = {
      $set: body,
      $unset: {
        city: 1 // 1 indicates to unset the field
      }
    };
    result1 = await UserModel.updateOne(filter, body.lock ? update : body)
    res.status = 200
    res.message = 'Profile Saved successfully'
    return res
  } catch (error) {}
})