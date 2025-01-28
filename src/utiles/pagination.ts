import { Model } from 'mongoose'

export interface PaginationOptions {
  page: number
  limit: number
  search?: string
  category?: string
}

export const paginateAndFilter = async <T extends { _id: any }>(
  model: Model<T>,
  queryParams: any,
  populateFields?: string
): Promise<{ results: T[]; total: number }> => {
  const { page = 1, limit = 10, search, category } = queryParams

  const pageNumber = Number(page)
  const limitNumber = Number(limit)

  if (isNaN(pageNumber) || pageNumber < 1) {
    throw new Error('Invalid page number')
  }
  if (isNaN(limitNumber) || limitNumber < 1) {
    throw new Error('Invalid limit')
  }

  const skip = (pageNumber - 1) * limitNumber

  const filter: any = {}
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ]
  }
  if (category) {
    filter.category = category
  }

  try {
    const query = model.find(filter).skip(skip).limit(limitNumber)
    if (populateFields) {
      query.populate({
        path: populateFields,
        select: '-password -__v' // Exclude password and version key from the result
      })
    }
    const results = (await query.lean().exec()) as T[]
    const total = await model.countDocuments(filter)

    return { results, total }
  } catch (error) {
    throw new Error('An error occurred while fetching data')
  }
}
