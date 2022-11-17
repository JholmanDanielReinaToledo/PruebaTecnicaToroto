import { works } from '../../lib/useCases'
import dbConnect from '../../lib/mongo/dbConnect'

export default async function farmersData (req, res) {
  try {
    if (req.method !== 'GET') throw new Error('Method not supported')
    await dbConnect()
    const data = await works.getAll()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ errorx:  error.message })
  }
}