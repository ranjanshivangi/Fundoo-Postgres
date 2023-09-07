import { client } from '../config/redis'
import HttpStatus from 'http-status-codes';


export const redisData = async (req, res, next) => {
 const data = await client.get(`NotesOfUser${req.body.createdBy}`);
 
  if (data != null) {
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: JSON.parse(data),
      message: 'All Notes fetched successfully from redis'
    });
  } else {
    next();
  }
};
